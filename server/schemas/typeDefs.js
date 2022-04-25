const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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
    seasonName: String!
    startYear: String!
    endYear: String
    league: League
    teams: [SoccerTeam]
  }

  input SeasonInput {
    seasonName: String!
    startYear: String!
    endYear: String
    league: ID
  }

  type SoccerTeam {
    _id: ID!
    teamName: String!
    teamColor: String
    teamPic: String
    season: Season
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
    season: ID
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
    playerNumber: String
    goals: [Goal]
    assists: [Assist]
    team: SoccerTeam
  }

  input SoccerPlayerInput {
    playerFirstName: String!
    playerLastName: String!
    playerPic: String
    playerNumber: String
    team: ID
  }

  type SoccerGame {
    _id: ID!
    gameDate: String!
    homeTeam: SoccerTeam
    awayTeam: SoccerTeam
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
    # league: League
    league(leagueId: ID!): League
    allLeagues: [League]
    season(seasonId: ID!): Season
    allSeasons: [Season]
    soccerTeam(soccerTeamId: ID!): SoccerTeam
    allSoccerTeams: [SoccerTeam]
    soccerPlayer(soccerPlayerId: ID!): SoccerPlayer
    allSoccerPlayers: [SoccerPlayer]
    soccerGame(soccerGameId: ID!): SoccerGame
    allSoccerGames: [SoccerGame]
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
      userFirstName: String!
      userLastName: String!
    ): Auth
    # addUser(username: String!, email: String!, password: String!): Auth
    # login(email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    # Above preloaded with React boilerplate
    # Below custom mutations
    # Create mutations
    addLeague(league: LeagueInput): League
    addSeason(season: SeasonInput): Season
    addTeam(team: SoccerTeamInput): SoccerTeam
    addPlayer(roster: SoccerPlayerInput): SoccerPlayer
    addGame(games: SoccerGameInput): SoccerGame

    # Deletion Mutations
    removeLeague(leagueId: ID!): League
    removeSeason(seasonId: ID!): Season
    removeSoccerTeam(soccerTeamId: ID!): SoccerTeam
    removeSoccerPlayer(soccerPlayerId: ID!): SoccerPlayer
    removeSoccerGame(soccerGameId: ID!): SoccerGame

    # Update mutations
    updateLeague(leagueId: ID!, league: LeagueInput): League
    updateSeason(seasonId: ID!, season: SeasonInput): Season
    updateSoccerTeam(soccerTeamId: ID!, soccerTeam: SoccerTeamInput): SoccerTeam
    updateSoccerPlayer(
      soccerPlayerId: ID!
      soccerPlayer: SoccerPlayerInput
    ): SoccerPlayer
  }
`;

module.exports = typeDefs;
