const { Schema, model } = require('mongoose');

const leagueSchema = new Schema({
  leagueName: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  leaguePic: {
    type: String,
    trim: true,
  },
  seasons: {
    type: Schema.Types.ObjectId,
    ref: 'Season',
  }
});


const League = model('League', leagueSchema);

module.exports = League;