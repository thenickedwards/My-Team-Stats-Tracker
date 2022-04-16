const { Schema, model } = require('mongoose');

const soccerGameSchema = new Schema({
  gameDate: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'SoccerTeam',
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'SoccerTeam',
  },
  goalsHome: Number,
  goalsAway: Number,
  assistsHome: Number,
  assistsAway: Number
});


const SoccerGame = model('SoccerGame', soccerGameSchema);

module.exports = SoccerGame;
