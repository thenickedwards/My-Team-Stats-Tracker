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
    soccerPlayer: async (parent, { SoccerGameId }) => {
      return SoccerGame.findOne({ _id: SoccerGameId });
    },
    allSoccerPlayers: async () => {
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
  }
};

module.exports = resolvers;
