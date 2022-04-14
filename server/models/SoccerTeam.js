const { Schema, model } = require('mongoose');

const soccerTeamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamColor: {
    type: String,
  },
  teamPic: {
    type: String,
    trim: true,
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
  seasons: {
    type: Schema.Types.ObjectId,
    ref: 'Season',
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: 'SoccerGame',
  },
  roster: {
    type: Schema.Types.ObjectId,
    ref: 'SoccerPlayer',
  },
  wins: Number,
  draws: Number,
  losses: Number,
  goalsFor: Number,
  goalsAgainst: Number,
  goalDifferential: Number
});


const SoccerTeam = model('SoccerTeam', soccerTeamSchema);

module.exports = SoccerTeam;