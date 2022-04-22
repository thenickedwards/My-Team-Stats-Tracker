import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      # email
    }
  }
`;

// ** Could use for favorites page, beyond MVP **

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      # email
    }
  }
`;

export const QUERY_LEAGUE = gql`
  query League($leagueId: ID!) {
    league(leagueId: $leagueId) {
      _id
      leagueName
      sport
      leaguePic
      seasons {
        _id
        seasonName
        startYear
        endYear
      }
    }
  }
`;

export const QUERY_LEAGUES = gql`
  query allLeagues {
    allLeagues {
      _id
      leagueName
      sport
      leaguePic
      seasons {
        _id
        startYear
        endYear
      }
    }
  }
`;

export const QUERY_SEASON = gql`
  query season($seasonId: ID!) {
    season(seasonId: $seasonId) {
      _id
      seasonName
      startYear
      endYear
      teams {
        _id
        teamName
        teamColor
        teamPic
      }
    }
  }
`;

export const QUERY_SEASONS = gql`
  query allSeasons {
    allSeasons {
      _id
      seasonName
      startYear
      endYear
      league {
        _id
      }
      teams {
        _id
        teamName
        teamColor
        teamPic
      }
    }
  }`;



export const QUERY_SOCCERTEAM = gql`
  query soccerTeam {
    soccerTeam {
      _id
      teamName
      teamColor
      teamPic
      season
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
    allSoccerTeams {
      _id
      teamName
      teamColor
      teamPic
      season
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
  query soccerPlayer($soccerPlayerId: ID!) {
    soccerPlayer(soccerPlayerId: $soccerPlayerId) {
      _id
      playerFirstName
      playerLastName
      playerPic
      playerNumber
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
      goals
      assists
      team
    }
  }
`;

export const QUERY_SOCCERGAME = gql`
  query soccerGame($soccerGameId: ID!) {
    soccerGame(soccerGameId: $soccerGameId) {
      _id
      gameDate
      homeTeam {
        _id
      }
      awayTeam {
        _id
      }
      goalsHome
      goalsAway
      assistsHome
      assistsAway
    }
  }
`;

export const QUERY_SOCCERGAMES = gql`
  query allSoccerGames {
    allSoccerGames {
      _id
      gameDate
      homeTeam {
        _id
      }
      awayTeam {
        _id
      }
      goalsHome
      goalsAway
      assistsHome
      assistsAway
    }
  }
`;
