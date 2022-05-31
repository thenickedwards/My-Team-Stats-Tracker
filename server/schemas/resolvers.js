const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const {
  User,
  League,
  Season,
  SoccerTeam,
  SoccerPlayer,
  SoccerGame,
} = require("../models");

const resolvers = {
  Query: {
    // All users
    users: async () => {
      return User.find();
    },
    // One user
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // League queries
    league: async (parent, { leagueId }) => {
      return League.findOne({ _id: leagueId }).populate("seasons");
    },
    allLeagues: async () => {
      return League.find().populate("seasons");
    },
    // Season queries
    season: async (parent, { seasonId }) => {
      return Season.findOne({ _id: seasonId }).populate("teams");
    },
    allSeasons: async () => {
      return Season.find().populate("teams");
    },
    // Team queries
    soccerTeam: async (parent, { soccerTeamId }) => {
      return SoccerTeam.findOne({ _id: soccerTeamId }).populate("roster");
    },
    allSoccerTeams: async () => {
      return SoccerTeam.find().populate("roster");
    },
    // Player queries
    soccerPlayer: async (parent, { soccerPlayerId }) => {
      return SoccerPlayer.findOne({ _id: soccerPlayerId });
    },
    allSoccerPlayers: async () => {
      return SoccerPlayer.find();
    },
    // Game queries
    soccerGame: async (parent, { soccerGameId }) => {
      return SoccerGame.findOne({ _id: soccerGameId });
    },
    allSoccerGames: async () => {
      return SoccerGame.find().populate("homeTeam").populate("awayTeam");
    },
  },

  Mutation: {
    // Signup
    addUser: async (
      parent,
      { username, email, password, userFirstName, userLastName }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        userFirstName,
        userLastName,
      });
      const token = signToken(user);
      return { token, user };
    },

    // Login
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    // CREATE MUTATIONS
    // Add league
    addLeague: async (parent, { league }, context) => {
      const newLeague = await League.create({ ...league });

      if (context.user) {
          // const updatedUser = 
          await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: {myLeagues: newLeague._id} },
              {
                  new: true,
                  runValidators: true
              }
          );
          // return updatedUser
      }

      return newLeague;
    },

    // Add season
    addSeason: async (parent, { season }, context) => {
      const newSeason = await Season.create({ ...season });
      await League.findOneAndUpdate(
        { _id: season.league },
        { $addToSet: { seasons: newSeason._id } },
        { new: true }
      );
      return newSeason;
    },

    // Add team
    addTeam: async (parent, { team }, context) => {
      const newTeam = await SoccerTeam.create({ ...team });

      await Season.findOneAndUpdate(
        { _id: team.season },
        { $addToSet: { teams: newTeam._id } },
        { new: true, runValidators: true }
      );

      if (context.user) {
        // const updatedUser = 
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: {myTeams: newTeam._id} },
            {
                new: true,
                runValidators: true
            }
        );
        // return updatedUser
      }

      return newTeam;
    },

    // Add player
    addPlayer: async (parent, { roster }, context) => {
      const newPlayer = await SoccerPlayer.create({ ...roster });
      console.log(roster);
      await SoccerTeam.findOneAndUpdate(
        { _id: roster.team },
        { $addToSet: { roster: newPlayer._id } },
        { new: true }
      );
      return newPlayer;
    },

    // UPDATE MUTATIONS
    // Update league
    updateLeague: async (parent, { leagueId, league }) => {
      return await League.findOneAndUpdate(
        { _id: leagueId },
        { ...league },
        { new: true }
      );
    },

    // Update season
    updateSeason: async (parent, { seasonId, season }) => {
      return await Season.findOneAndUpdate(
        { _id: seasonId },
        { ...season },
        { new: true }
      );
    },

    // Update team
    updateSoccerTeam: async (parent, { soccerTeamId, soccerTeam }) => {
      return await SoccerTeam.findOneAndUpdate(
        { _id: soccerTeamId },
        { ...soccerTeam },
        { new: true }
      );
    },

    // Update player
    updateSoccerPlayer: async (parent, { soccerPlayerId, soccerPlayer }) => {
      return await SoccerPlayer.findOneAndUpdate(
        { _id: soccerPlayerId },
        { ...soccerPlayer },
        { new: true }
      );
    },

    // DELETE MUTATIONS
    // Delete League
    removeLeague: async (parent, { leagueId }, context) => {
      const league = await League.findOneAndDelete({
        _id: leagueId,
      });
      await Season.findOneAndUpdate(
        { league: leagueId },
        { $pull: { leagues: leagueId } }
      );
      if (context.user) {
        // const updatedUser = 
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { myLeagues: leagueId } },
            { new: true }
        );
        // return updatedUser
    }
      return league;
    },

    // Delete Season
    removeSeason: async (parent, { seasonId }, context) => {
      const leagueId = await Season.findOne({
        _id: seasonId,
      });

      await League.findOneAndUpdate(
        { _id: leagueId.league },
        { $pull: { seasons: { seasonId } } }
      );
      const season = await Season.findOneAndDelete({
        _id: seasonId,
      });

      return season;
    },

    // Delete Team
    removeSoccerTeam: async (parent, { soccerTeamId }, context) => {
      const seasonId = await SoccerTeam.findOne({
        _id: soccerTeamId,
      });

      await Season.findOneAndUpdate(
        { _id: seasonId.season },
        { $pull: { teams: { soccerTeamId } } }
      );

      if (context.user) {
        // const updatedUser = 
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { myTeams: soccerTeamId } },
            { new: true }
        );
        // return updatedUser
    }

      const team = await SoccerTeam.findOneAndDelete({
        _id: soccerTeamId,
      });

      return team;
    },

    // Delete Player
    removeSoccerPlayer: async (parent, { soccerPlayerId }, context) => {
      const soccerTeamId = await SoccerPlayer.findOne({
        _id: soccerPlayerId,
      });

      await SoccerTeam.findOneAndUpdate(
        { _id: soccerTeamId.team },
        { $pull: { roster: { soccerPlayerId } } }
      );

      const player = await SoccerPlayer.findOneAndDelete({
        _id: soccerPlayerId,
      });

      return player;
    },
  },
};

module.exports = resolvers;
