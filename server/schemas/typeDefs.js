const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    userFirstName: String!
    userLastName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type League {
    _id: ID!
    leagueName: String!
    sport: String!
    leaguePic: String
    seasons: [Season]
  }

  input LeagueInput {
    leagueName: String!
    sport: String!
    leaguePic: String
  }

  type Season {
    _id: ID!
    startYear: Number!
    startMonth: Number
    endYear: Number
    endMonth: Number
    league: [League]
    teams: [Team]
  }

  input SeasonInput {
    startYear: Number!
    endYear: Number
  }

  type SoccerTeam {
    _id: ID!
    teamName: String!
    teamColor: String
    teamPic: String
    league: [League]
    seasons: [Season]
    games: [SoccerGame]
    roster: [SoccerPlayer]
    wins: Number,
    draws: Number,
    losses: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    goalDifferential: Number
  }

  input SoccerTeamInput {
    teamName: String!
    teamColor: String
    teamPic: String
    league: [League]
    seasons: [Season]
  }

  type SoccerPlayer {
    _id: ID!
    playerFirstName: String!
    playerLastName: String!
    playerPic: String
    playerNumber: Number
    goals: {
      gameDate: String,
      minute: Number,
      totalGoals: Number,
    },
    assists: {
      gameDate: String,
      minute: Number,
      totalAssists: Number,
    },
    teams: [Team]
  }

  input SoccerPlayerInput {
    playerFirstName: String!
    playerLastName: String!
    playerPic: String
    playerNumber: Number
  }

  type SoccerGame {
    _id: ID!
    gameDate: String!
    homeTeam: [Team]
    awayTeam: [Team]
    goalsHome: Number
    goalsAway: Number
    assistsHome: Number
    assistsAway: Number
  }

  type SoccerGameInput {
    gameDate: String!
    homeTeam: [Team]
    awayTeam: [Team]
    goalsHome: Number
    goalsAway: Number
    assistsHome: Number
    assistsAway: Number
  }


  type Query {
    users: [User]
    # # Doubble check below was previously
    # user(username: String!): User
    user(email: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
