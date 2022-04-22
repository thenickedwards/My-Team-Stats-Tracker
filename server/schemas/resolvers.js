const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, League, Season, SoccerTeam, SoccerPlayer, SoccerGame } = require('../models');


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
      throw new AuthenticationError('You need to be logged in!');
    },
    // League queries
    league: async (parent, { leagueId }) => {
      return League.findOne({ _id: leagueId }).populate('seasons');;
    },
    allLeagues: async () => {
      return League.find().populate('seasons');
    },
    // Season queries
    season: async (parent, { seasonId }) => {
      return Season.findOne({ _id: seasonId }).populate('teams');
    },
    allSeasons: async () => {
      return Season.find().populate('teams');
    },
    // Team queries
    soccerTeam: async (parent, { soccerTeamId }) => {
      return SoccerTeam.findOne({ _id: soccerTeamId }).populate('roster');
    },
    allSoccerTeams: async () => {
      return SoccerTeam.find().populate('roster');
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
      return SoccerGame.find();
    },
  },


  Mutation: {
    // Signup
    addUser: async (parent, { username, email, password, userFirstName, userLastName }) => {
      const user = await User.create({ username, email, password, userFirstName, userLastName });
      const token = signToken(user);
      return { token, user };
    },

    // Login
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    //// Add league
    addLeague: async (parent, { league }, context) => {
      // if (context.user) {
        const newLeague = await League.create({...league});
        return newLeague
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    //// Add season
    addSeason: async (parent, { season }, context) => {
      // if (context.user) {
        const newSeason = await Season.create({...season});
        await League.findOneAndUpdate(
          // { _id: req.params.leagueId },
          { _id: season.league },
          { $addToSet: { seasons: newSeason._id } },
          { new: true }
        )
        return newSeason
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    //// Add team
    addTeam: async (parent, { team }, context) => {
      // if (context.user) {
        const newTeam = await SoccerTeam.create({...team});
        
        await Season.findOneAndUpdate(
          // { _id: req.params.seasonId },
          { _id: team.season },
          { $addToSet: { teams: newTeam._id } },
          { new: true,
            runValidators: true
           }
        )
        return newTeam
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    //// Add player
    addPlayer: async (parent, { roster }, context) => {
      // if (context.user) {
        const newPlayer = await SoccerPlayer.create({...roster});
        console.log(roster);
        await SoccerTeam.findOneAndUpdate(
          // { _id: req.params.seasonId },
          { _id: roster.team },
          { $addToSet: { roster: newPlayer._id } },
          { new: true }
        )
        return newPlayer
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },


    
    //// Update league
    updateLeague: async (parent, { leagueId, league }) => {
      return await League.findOneAndUpdate(
        { _id: leagueId }, 
        { ...league },
        { new: true }
      );
    },

    //// Update season
    updateSeason: async (parent, { seasonId, season }) => {
      return await Season.findOneAndUpdate(
        { _id: seasonId }, 
        { ...season },
        { new: true }
      );
    },

    //// Update team
    updateSoccerTeam: async (parent, { soccerTeamId, soccerTeam }) => {
      return await SoccerTeam.findOneAndUpdate(
        { _id: soccerTeamId }, 
        { ...soccerTeam },
        { new: true }
      );
    },

    //// Update player
    updateSoccerPlayer: async (parent, { soccerPlayerId, soccerPlayer }) => {
      return await SoccerPlayer.findOneAndUpdate(
        { _id: soccerPlayerId }, 
        { ...soccerPlayer },
        { new: true }
      );
    },
    
    
    //// Delete League
    removeLeague: async (parent, { leagueId }, context) => {
      // if (context.user) {
        const league = await League.findOneAndDelete({
          _id: leagueId
        });

        // Add context.user before _id value
        await Season.findOneAndUpdate(
          { league: leagueId },
          { $pull: { leagues: leagueId } }
        );

        return league;

    // }
    // throw new AuthenticationError('You need to be logged in!');
  },

    //// Delete Season
    removeSeason: async (parent, { seasonId }, context) => {
      // if (context.user) {
        // To pull a model from a parent model, retrieve the ID before deleting
        const leagueId = await Season.findOne({
          _id: seasonId
        });

        await League.findOneAndUpdate(
          { _id: leagueId.league},
          { $pull: { seasons: {seasonId} } }
        );
        // Main delete action for the model
        const season = await Season.findOneAndDelete({
          _id: seasonId
        });

        return season;
    }
      // throw new AuthenticationError('You need to be logged in!');
    },

    //// Delete Team
    // removeSoccerTeam: async (parent, { soccerTeamId }, context) => {
    //   // if (context.user) {
    //     const seasonId = await Team.findOne({
    //       _id: soccerTeamId
    //     });

    //     await Season.findOneAndUpdate(
    //       { _id: seasonId.season},
    //       { $pull: { teams: {soccerTeamId} } }
    //     );

    //     const team = await SoccerTeam.findOneAndDelete({
    //       _id: soccerTeamId
    //     });

    //     return team;
    // }
      // throw new AuthenticationError('You need to be logged in!');
    // }

    //// Delete Player
    // removeSoccerPlayer: async (parent, { soccerPlayerId }, context) => {
      // if (context.user) {
        // const soccerTeamId = await Team.findOne({
        //   _id: soccerTeamId
        // });

        // await SoccerTeam.findOneAndUpdate(
        //   { _id: soccerTeamId.soccerTeam},
        //   { $pull: { roster: {soccerPlayerId} } }
        // );

        // const player = await SoccerPlayer.findOneAndDelete({
        //   _id: soccerPlayerId
        // });

        // return player;
    
      // throw new AuthenticationError('You need to be logged in!');
    // },
  
};

module.exports = resolvers;
