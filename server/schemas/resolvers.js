const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, League, Season, SoccerTeam, SoccerPlayer } = require('../models');


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
    league: async (parent, { league }) => {
      return League.findOne({ league });
    },
    allLeagues: async () => {
      return League.find();
    },
    // Season queries
    season: async (parent, { season }) => {
      return Season.findOne({ season });
    },
    allSeasons: async () => {
      return Season.find();
    },
    // Team queries
    soccerTeam: async (parent, { soccerTeam }) => {
      return SoccerTeam.findOne({ soccerTeam });
    },
    allSoccerTeams: async () => {
      return SoccerTeam.find();
    },
    // Player queries
    soccerPlayer: async (parent, { soccerPlayer }) => {
      return SoccerPlayer.findOne({ soccerPlayer });
    },
    allSoccerPlayers: async () => {
      return SoccerPlayer.find();
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
    // Add league
    addLeague: async (parent, { league }, context) => {
      // if (context.user) {
        const newLeague = await League.create({...league});
        return newLeague
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // Add season
    addSeason: async (parent, { season }, context) => {
      // if (context.user) {
        const newSeason = await Season.create({...season});
        return newSeason
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // Add team
    addTeam: async (parent, { team }, context) => {
      // if (context.user) {
        const newTeam = await SoccerTeam.create({...team});
        return newTeam
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    addPlayer: async (parent, { roster }, context) => {
      // if (context.user) {
        const newPlayer = await SoccerPlayer.create({...roster});
        return newPlayer
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
