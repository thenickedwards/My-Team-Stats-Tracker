const { Schema, model } = require("mongoose");

const leagueSchema = new Schema({
  leagueName: {
    type: String,
    required: [true, "League name is required"],
  },
  sport: {
    type: String,
    required: [true, "Sport is required"],
  },
  leaguePic: {
    type: String,
    trim: true,
  },
  seasons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Season",
    },
  ],
});

const League = model("League", leagueSchema);

module.exports = League;
