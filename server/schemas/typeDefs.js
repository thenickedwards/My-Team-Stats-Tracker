const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    # email: String
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
    startYear: Int!
    # startMonth: Int
    endYear: Int
    # endMonth: Int
    league: [League]
    teams: [SoccerTeam]
  }

  input SeasonInput {
    startYear: Int!
    endYear: Int
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
    wins: Int
    draws: Int
    losses: Int
    goalsFor: Int
    goalsAgainst: Int
    goalDifferential: Int
  }

  input SoccerTeamInput {
    teamName: String!
    teamColor: String
    teamPic: String
    # league: [League]
    # seasons: [Season]
  }

  type Goal {
    _id: ID!
    game: SoccerGame
    minute: Int
  }

  type Assist {
    _id: ID!
    game: SoccerGame
    minute: Int
  }

  type SoccerPlayer {
    _id: ID!
    playerFirstName: String!
    playerLastName: String!
    playerPic: String
    playerNumber: Int
    goals: [Goal]
    assists: [Assist]
    teams: [SoccerTeam]
  }

  input SoccerPlayerInput {
    playerFirstName: String!
    playerLastName: String!
    playerPic: String
    playerNumber: Int
  }

  type SoccerGame {
    _id: ID!
    gameDate: String!
    homeTeam: [SoccerTeam]
    awayTeam: [SoccerTeam]
    goalsHome: Int
    goalsAway: Int
    assistsHome: Int
    assistsAway: Int
  }

  input SoccerGameInput {
    gameDate: String!
    homeTeam: ID!
    awayTeam: ID!
    goalsHome: Int
    goalsAway: Int
    assistsHome: Int
    assistsAway: Int
  }


  type Query {
    users: [User]
    user(username: String!): User
    me: User
    # Above preloaded with React boilerplate
    league: League
    allLeagues: [League]
    season: Season
    allSeasons: [Season]
    soccerTeam: SoccerTeam
    allSoccerTeams: [SoccerTeam]
    soccerPlayer: SoccerPlayer
    allSoccerPlayers: [SoccerPlayer]
    soccerGame: SoccerGame
    allSoccerGames: [SoccerGame]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    # addUser(username: String!, email: String!, password: String!): Auth
    # login(email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    # Above preloaded with React boilerplate
    addLeague(league: LeagueInput): League
    addSeason(season: SeasonInput): Season
    addTeam(team: SoccerTeamInput): SoccerTeam
    addPlayer(roster: SoccerPlayerInput): SoccerPlayer
    addGame(games: SoccerGameInput): SoccerGame
    # Still need edits and deletions
  }
`;

module.exports = typeDefs;
