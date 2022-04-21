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
      seasonName
      startYear
      endYear
      league
    }
  }
`;

// export const ADD_SOCCERTEAM = gql`
//   mutation addTeam($teams: SoccerTeamInput) {
//     addTeam(team: $team) {
//       _id
//       teamName
//       teamColor
//       teamPic
//       season
//     }
//   }
// `;

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

// export const ADD_SOCCERPLAYER = gql`
//   mutation addPlayer(
//     $playerFirstName: String!,
//     $playerLastName: String!,
//     $playerPic: String,
//     $playerNumber: Int,
//     $goals: [Goal],
//     $assists: [Assist],
//     $teams: [SoccerTeam]
//   ) {
//     addPlayer(
//       playerFirstName: $playerFirstName,
//       playerLastName: $playerLastName,
//       playerPic: $playerPic,
//       playerNumber: $playerNumber,
//       goals: $goals,
//       assists: $assists,
//       teams: $teams
//     ) {
//       soccerPlayer {
//         _id
//         playerFirstName
//         playerLastName
//         playerPic
//         playerNumber
//         teams
//       }
//     }
//   }
// `;


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


//// Delete Mutations TODO: Double check arguments

export const REMOVE_LEAGUE = gql`
  mutation removeLeague($leagueId: ID!) {
    removeLeague(league: $league) {
      _id
      leagueName
      sport
      leaguePic
    }
  }
`;

export const REMOVE_SEASON = gql`
  mutation removeSeason($season: SeasonInput) {
    removeSeason(season: $season) {
      _id
      seasonName
      startYear
      endYear
      league
    }
  }
`;

export const REMOVE_SOCCERTEAM = gql`
  mutation removeTeam($team: SoccerTeamInput) {
    removeTeam(team: $team) {
      _id
      teamName
      teamColor
      teamPic
      season {
        _id
      }
    }
  }`;


export const REMOVE_SOCCERPLAYER = gql`
  mutation removePlayer($roster: SoccerPlayerInput) {
    removePlayer(roster: $roster) {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
    }
  }
`;

export const REMOVE_SOCCERGAME = gql`
  mutation removeGame($game: SoccerGame) {
    removeGame(game: $game) {
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

export const REMOVE_GOAL = gql`
  mutation removeGoal($goal: goal) {
    removeGoal(goal: $goal) {
      goal {
        _id
        game
        minute
      }
    }
  }
`;

export const REMOVE_ASSIST = gql`
  mutation removeAssist($assist: assist) {
    removeAssist(assist: $assist) {
      assist {
        _id
        game
        minute
      }
    }
  }
`;