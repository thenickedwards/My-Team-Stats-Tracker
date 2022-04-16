import { gql } from '@apollo/client';

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

// Need to add email, firstname, lastname
export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const LOGIN_USER = gql`
//   mutation login(
//     $username: String!,
//     $email: String, 
//     $password: String!,
//     $firstName: String,
//     $lastName: String
//     ) {
//     login(
//       username: $username,
//       email: $email, 
//       password: $password,
//       firstName: $firstName,
//       lastName: $lastName
//       ) {
//       token
//       user {
//         _id
//         username
//         email
//         firstName
//         lastName
//       }
//     }
//   }
// `;

// For Signup Form?
// Switch email to username
// export const ADD_USER = gql`
//   mutation addUser($email: String!, $password: String!) {
//     addUser(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//         email
//         firstName
//         lastName
//       }
//     }
//   }
// `;

export const ADD_LEAGUE = gql`
  mutation addLeague(
    $leagueName: String!, 
    $sport: String!,
    $leaguePic: String,
    $seasons: [Season]
    ) {
    addLeague(
      leagueName: $leagueName,
      sport: $sport,
      leaguePic: $leaguePic
      seasons: $seasons
    ) {
      league {
        _id
        leagueName
        sport
        leaguePic
        seasons
      }
    }
  }
`;

// *** Are we keeping start/end month in season? -CJB ***
export const ADD_SEASON = gql`
  mutation addSeason(
    $startYear: Int!,
    $startMonth: Int,
    $endYear: Int,
    $endMonth: Int,
    $league: [League],
    $teams: [Team],
  ) {
    addSeason(
      startYear: $startYear,
      startMonth: $startMonth,
      endYear: $endYear,
      endMonth: $endMonth,
      league: $league,
      teams: $teams,
    ) {
      season {
      _id
      startYear
      endYear
      league
      teams
      }
    }
  }
`;

export const ADD_SOCCERTEAM = gql`
  mutation addTeam(
    $teamName: String!,
    $teamColor: String,
    $teamPic: String,
    $league: [League],
    $seasons: [Season],
    $games: [SoccerGame],
    $roster: [SoccerPlayer],
    $wins: Int,
    $draws: Int,
    $losses: Int,
    $goalsFor: Int,
    $goalsAgainst: Int,
    $goalDifferential: Int,
  ) {
    addTeam(
      teamName: $teamName,
      teamColor: $teamColor,
      teamPic: $teamPic,
      league: $league,
      seasons: $seasons,
      games: $games,
      roster: $roster,
      wins: $wins,
      draws: $draws,
      losses: $losses
      goalsFor: $goalsFor,
      goalsAgainst: $goalsAgainst,
      goalDifferential: $goalDifferential
    ) {
      soccerTeam {
        _id
        teamName
        teamColor
        teamPic
        league
        seasons
        games
        roster
        wins
        draws
        losses
        goalsFor
        goalsAgainst
        goalDifferential
      }
    }
  }
`;

export const ADD_SOCCERPLAYER = gql`
  mutation addPlayer(
    $playerFirstName: String!,
    $playerLastName: String!,
    $playerPic: String,
    $playerNumber: Int,
    $goals: [Goal],
    $assists: [Assist],
    $teams: [Team]
  ) {
    addPlayer(
      playerFirstName: $playerFirstName,
      playerLastName: $playerLastName,
      playerPic: $playerPic,
      playerNumber: $playerNumber,
      goals: $goals,
      assists: $assists,
      teams: $teams
    ) {
      soccerPlayer {
        _id
        playerFirstName
        playerLastName
        playerPic
        playerNumber
        teams
      }
    }
  }
`;


export const ADD_SOCCERGAME = gql`
  mutation addGame(
    $gameDate: String!,
    $homeTeam: [Team],
    $awayTeam: [Team],
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