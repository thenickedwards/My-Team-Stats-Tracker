const { Schema, model } = require('mongoose');

const soccerGameSchema = new Schema({
  gameDate: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  goalsHome: Number,
  goalsAway: Number,
  assistsHome: Number,
  assistsAway: Number
});


const SoccerGame = model('SoccerGame', soccerGameSchema);

module.exports = SoccerGame;
