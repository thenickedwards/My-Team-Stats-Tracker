const { Schema, model } = require('mongoose');
const SoccerGame = require('./SoccerGame');

// GOAL SCHEMA
const goalSchema = new Schema({
  game: SoccerGame,
  minute: Number
})

// ASSIST SCHEMA
const assistSchema = new Schema({
  game: SoccerGame,
  minute: Number
}
)
// SOCCER PLAYER SCHEMA
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
  goals: [goalSchema],
  assists: [assistSchema],
  teams: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false,
}
);

// Virutal to sum all goals
soccerPlayerSchema.virtual('careerGoals').get(function () {
  return this.goals.length;
});

// Virutal to sum all assists
soccerPlayerSchema.virtual('careerAssists').get(function () {
  return this.assists.length;
});


const SoccerPlayer = model('SoccerPlayer', soccerPlayerSchema);

module.exports = SoccerPlayer;