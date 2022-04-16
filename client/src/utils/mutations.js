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
      startYear
      endYear
    }
  }
`;

// export const ADD_SEASON = gql`
//   mutation addSeason(
//     $startYear: Int!,
//     $endYear: Int,
//     $league: [League],
//     $teams: [SoccerTeam],
//   ) {
//     addSeason(
//       startYear: $startYear,
//       endYear: $endYear,
//       league: $league,
//       teams: $teams,
//     ) {
//       season {
//       _id
//       startYear
//       endYear
//       league
//       teams
//       }
//     }
//   }
// `;

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
    $teams: [SoccerTeam]
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