const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: "SoccerGame",
  },
  minute: Number,
});

const assistSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: "SoccerGame",
  },
  minute: Number,
});

const soccerPlayerSchema = new Schema(
  {
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
    team: {
      type: Schema.Types.ObjectId,
      ref: "SoccerTeam",
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virutal to sum all goals
soccerPlayerSchema.virtual("careerGoals").get(function () {
  return this.goals.length;
});

// Virutal to sum all assists
soccerPlayerSchema.virtual("careerAssists").get(function () {
  return this.assists.length;
});

const SoccerPlayer = model("SoccerPlayer", soccerPlayerSchema);

module.exports = SoccerPlayer;
