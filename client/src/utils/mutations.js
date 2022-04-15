import { gql } from '@apollo/client';

// TODO: Double check arguemnts, add to rest of mutations
export const LOGIN_USER = gql`
  mutation login(
    $email: String!, 
    $password: String!,
    $firstName: String,
    $lastName: String
    ) {
    login(
      email: $email, 
      password: $password,
      firstName: $firstName,
      lastName: $lastName
      ) {
      token
      user {
        _id
        email
        password
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        firstName
        lastName
      }
    }
  }
`;

// export const ADD_LEAGUE = gql`
//   mutation addLeague() {
//     addLeague() {
//       league {
//         _id
//         leagueName
//         sport
//         leaguePic
//         seasons
//       }
//     }
//   }
// `;

// export const ADD_SEASON = gql`
//   mutation addSeason() {
//     addSeason() {
//       season {
//       _id
//       startYear
//       endYear
//       league
//       teams
//       }
//     }
// `;

// export const ADD_SOCCERTEAM = gql`
//   mutation addTeam() {
//     addTeam() {
//       soccerTeam {
//       _id
//         teamName
//         teamColor
//         teamPic
//         league
//         seasons
//         games
//         roster
//         wins
//         draws
//         losses
//         goalsFor
//         goalsAgainst
//         goalDifferential
//       }
//     }
//   }
// `;

// export const ADD_SOCCERPLAYER = gql`
//   mutation addPlayer() {
//     addPlayer() {
//       soccerPlayer {
//         _id
//         playerFirstName
//         playerLastName
//         playerPic
//         playerNumber
//         # Correct syntax?
//         goals [
//           gameDate
//           minute
//           totalGoals
//         ]
//         assists [
//           gameDate
//           minute
//           totalAssists
//         ]
//         teams
//       }
//     }
//   }
// `;


// export const ADD_SOCCERGAME = gql`
//   mutation addGame() {
//     addGame() {
//       soccerGame {
//         _id
//         gameDate
//         homeTeam
//         awayTeam
//         goalsHome
//         goalsAway
//         assistsHome
//         assistsAway
//       }
//     }
//   }
// `;

