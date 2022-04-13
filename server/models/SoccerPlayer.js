const { Schema, model } = require('mongoose');

const soccerPlayerSchema = new Schema({
  playerFirstName: {
    type: String,
    required: true,
    trim: true,
  },
  playerLastName: {
    type: String,
    required: true,
    trim: true,
  },
  playerPic: {
    type: String,
    trim: true,
  },
  playerNumber: Number,
  goals: {
    gameDate: String,
    minute: Number,
    totalGoals: Number,
  },
  assists: {
    gameDate: String,
    minute: Number,
    totalAssists: Number,
  },
  teams: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }
});


const SoccerPlayer = model('SoccerPlayer', soccerPlayerSchema);

module.exports = SoccerPlayer;
