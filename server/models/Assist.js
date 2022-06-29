const { Schema, model } = require("mongoose");

const assistSchema = new Schema({
    assistingPlayer: {
      type: Schema.Types.ObjectId,
      ref: "SoccerPlayer",
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "SoccerGame",
      },
      minute: Number,
  });

const Assist = model("Assist", assistSchema);

module.exports = Assist;