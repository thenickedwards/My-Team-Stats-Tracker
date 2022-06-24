const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
    scoringPlayer: {
      type: Schema.Types.ObjectId,
      ref: "SoccerPlayer",
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "SoccerGame",
      },
      minute: Number,
  });

const Goal = model("Goal", goalSchema);

module.exports = Goal;