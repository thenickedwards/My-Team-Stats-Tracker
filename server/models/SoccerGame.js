const { Schema, model } = require("mongoose");

const soccerGameSchema = new Schema(
  {
    gameDate: {
      required: true,
      type: String,
      //POSSIBLE FUTURE DEVELOPMENT
      // type: Date,
      // default: Date.now,
      // get: timestamp => dayjs(timestamp).format('MMM D, YYYY h:mm A')
    },
    homeTeam: {
      type: Schema.Types.ObjectId,
      ref: "SoccerTeam",
    },
    awayTeam: {
      type: Schema.Types.ObjectId,
      ref: "SoccerTeam",
    },
    // goalsHome: Number,
    // goalsAway: Number,
    // assistsHome: Number,
    // assistsAway: Number,
    goalsHome: {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
    goalsAway: {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
    assistsHome: Number,
    assistsAway: Number,
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
}
);

// Virutal to sum goals
soccerGameSchema.virtual("scoreHome").get(function () {
  return this.goalsHome.length;
});

soccerGameSchema.virtual("scoreAway").get(function () {
  return this.goalsAway.length;
});


const SoccerGame = model("SoccerGame", soccerGameSchema);

module.exports = SoccerGame;
