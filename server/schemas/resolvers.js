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
      return League.findOne({ league }).populate('seasons');;
    },
    allLeagues: async () => {
      return League.find().populate('seasons');
    },
    // Season queries
    season: async (parent, { season }) => {
      return Season.findOne({ season }).populate('teams');
    },
    allSeasons: async () => {
      return Season.find().populate('teams');
    },
    // Team queries
    soccerTeam: async (parent, { soccerTeam }) => {
      return SoccerTeam.findOne({ soccerTeam }).populate('roster');
    },
    allSoccerTeams: async () => {
      return SoccerTeam.find().populate('roster');
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

    //// Delete League
    removeLeague: async (parent, { leagueId }, context) => {
      // if (context.user) {
        const league = await League.findOneAndDelete({
          _id: leagueId
        });

        // Add context.user before _id value
        await User.findOneAndUpdate(
          { _id: _id },
          { $pull: { leagues: league._id } }
        );

        return league;

    // }
    // throw new AuthenticationError('You need to be logged in!');
  },
    
    //// Delete Season
    // removeSeason: async (parent, { leagueId, season }, context) => {
    //   if (context.user) {
    //     return League.findOneAndUpdate(
    //       { _id: context.user.leagueId },
    //       { $pull: { seasons: season } },
    //       { new: true }
    //     );
    //   }
    // throw new AuthenticationError('You need to be logged in!');
    // },

    removeSeason: async (parent, { thoughtId, seasonId }, context) => {
      if (context.user) {
        return League.findOneAndUpdate(
          { _id: leagueId },
          {
            $pull: {
              seasons: {
                _id: seasonId
                // Do all fields need to be listed here?
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //// Delete Team
    removeTeam: async (parent, { seasonId, team }, context) => {
      if (context.user) {
        return Season.findOneAndUpdate(
          { _id: context.user.seasonId },
          { $pull: { teams: team } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //// Delete Player
    removePlayer: async (parent, { teamId, player }, context) => {
      if (context.user) {
        return Team.findOneAndUpdate(
          { _id: context.user.teamId },
          { $pull: { players: player } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //// Update League

    //// Update Season

    //// Update Team

    //// Update Player

  }
};

module.exports = resolvers;
