import { gql } from '@apollo/client';

// USER LOGIN & SIGNUP
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $password: String!
    $email: String!,
    $userFirstName: String!,
    $userLastName: String!
    ) {
    addUser(
      username: $username,
      password: $password,
      email: $email,
      userFirstName: $userFirstName,
      userLastName: $userLastName
      ) {
      token
      user {
        _id
        username
        email
        userFirstName
        userLastName
      }
    }
  }
`;

// CREATE MUTATIONS

export const ADD_LEAGUE = gql`
  mutation addLeague($league: LeagueInput) {
  addLeague(league: $league) {
    _id
    leagueName
    sport
    leaguePic
  }
}
`;


export const ADD_SEASON = gql`
  mutation addSeason($season: SeasonInput) {
    addSeason(season: $season) {
      _id
      seasonName
      startYear
      endYear
      league
    }
  }
`;

export const ADD_SOCCERTEAM = gql`
  mutation addTeam($team: SoccerTeamInput) {
    addTeam(team: $team) {
      _id
      teamName
      teamColor
      teamPic
      season {
        _id
      }
    }
  }`;


export const ADD_SOCCERPLAYER = gql`
  mutation addPlayer($roster: SoccerPlayerInput) {
    addPlayer(roster: $roster) {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
    }
  }
`;

export const ADD_SOCCERGAME = gql`
  mutation addGame(
    $gameDate: String!,
    $homeTeam: [SoccerTeam],
    $awayTeam: [SoccerTeam],
    $goalsHome: Int,
    $goalsAway: Int,
    $assistsHome: Int,
    $assistsAway: Int,
  ) {
    addGame(
      gameDate: $gameDate,
      homeTeam: $homeTeam,
      awayTeam: $awayTeam,
      goalsHome: $goalsHome,
      goalsAway: $goalsAway,
      assistsHome: $assistsHome,
      assistsAway: $assistsAway
    ) {
      soccerGame {
        _id
        gameDate
        homeTeam
        awayTeam
        goalsHome
        goalsAway
        assistsHome
        assistsAway
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($game: SoccerGame, $minute: Int) {
    addGoal(game: $game, minute: $minute) {
      goal {
        _id
        game
        minute
      }
    }
  }
`;

export const ADD_ASSIST = gql`
  mutation addAssist($game: SoccerGame, $minute: Int) {
    addAssist(game: $game, minute: $minute) {
      assist {
        _id
        game
        minute
      }
    }
  }
`;



// UPDATE MUTTIONS

export const UPDATE_LEAGUE = gql`
  mutation updateLeague($leagueId: ID!, $league: LeagueInput) {
    updateLeague(leagueId: $leagueId, league: $league) {
      _id
      leagueName
      sport
      leaguePic
    }
  }
`;

export const UPDATE_SEASON = gql `
  mutation updateSeason($seasonId: ID!, $season: SeasonInput) {
    updateSeason(seasonId: $seasonId, season: $season) {
      _id
      seasonName
      startYear
      endYear
    }
  }
`;

export const UPDATE_TEAM = gql `
  mutation updateSoccerTeam($soccerTeamId: ID!, $team: SoccerTeamInput) {
    updateSoccerTeam(soccerTeamId: $soccerTeamId, soccerTeam: $team) {
      _id
      teamName
      teamColor
      teamPic
    }
  }
`;

export const UPDATE_PLAYER = gql `
  mutation updateSoccerPlayer($soccerPlayerId: ID!, $team: SoccerPlayerInput) {
    updateSoccerPlayer(soccerPlayerId: $soccerPlayerId, team: $team) {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
    }
}
`;


// UPDATE GAME??


//// Delete Mutations

export const REMOVE_LEAGUE = gql`
  mutation removeLeague($leagueId: ID!) {
    removeLeague(league: $league)
  }
`;

export const REMOVE_SEASON = gql`
  mutation removeSeason($seasonId: ID!) {
    removeSeason(season: $season)
  }
`;

export const REMOVE_SOCCERTEAM = gql`
  mutation removeTeam($soccerTeamId: ID!) {
    removeTeam(soccerTeam: $soccerTeam)
  }
`;

export const REMOVE_SOCCERPLAYER = gql`
  mutation removeSoccerPlayer($soccerPlayerId: ID!) {
    removePlayer(roster: $roster)
  }
`;

export const REMOVE_SOCCERGAME = gql`
  mutation removeSoccerGame($soccerGameId: ID!) {
    removeGame(soccerGame: $soccerGame)
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($goal: goal) {
    removeGoal(goal: $goal)
  }
`;

export const REMOVE_ASSIST = gql`
  mutation removeAssist($assist: assist) {
    removeAssist(assist: $assist)
  }
`;

