import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;

// ** Could use for favorites page, beyond MVP **

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//     }
//   }
// `;

export const QUERY_LEAGUE = gql`
  query league {
    league {
      _id
      leagueName
      sport
      leaguePic
      seasons
    }
  }
`;

export const QUERY_LEAGUES = gql`
  query allLeagues {
    league {
      _id
      leagueName
      sport
      leaguePic
      seasons
    }
  }
`;

export const QUERY_SEASON = gql`
  query season {
    season {
      _id
      startYear
      endYear
      league
      teams
    }
  }
`;

export const QUERY_SEASONS = gql`
  query allSeasons {
    season {
      _id
      startYear
      endYear
      league
      teams
    }
  }
`;

export const QUERY_SOCCERTEAM = gql`
  query soccerTeam {
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
`;

export const QUERY_SOCCERTEAMS = gql`
  query allSoccerTeams {
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
`;

export const QUERY_SOCCERPLAYER = gql`
  query soccerPlayer {
    soccerPlayer {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
      # Correct syntax?
      goals [
        gameDate
        minute
        totalGoals
      ]
      assists [
        gameDate
        minute
        totalAssists
      ]
      teams
    }
  }
`;

export const QUERY_SOCCERPLAYERS = gql`
  query allSoccerPlayers {
    soccerPlayer {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
      # Correct syntax?
      goals [
        gameDate
        minute
        totalGoals
      ]
      assists [
        gameDate
        minute
        totalAssists
      ]
      teams
    }
  }
`;

export const QUERY_SOCCERGAME = gql`
  query soccerGame {
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
`;

export const QUERY_SOCCERGAMES = gql`
  query allSoccerGames {
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
`;
