const { Schema, model } = require('mongoose');

const soccerGameSchema = new Schema({
  gameDate: {
    required: true,
    type: Date,
    default: Date.now,
    // get: timestamp => dayjs(timestamp).format('MMM D, YYYY h:mm A')
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
