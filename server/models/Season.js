const { Schema, model } = require('mongoose');

const seasonSchema = new Schema({
  startYear: {
    type: Number,
    required: true,
    match: [/^\d\d\d\d$/, 'Must be 4 digit year!'],
  },
  endYear: {
    type: Number,
    trim: true,
    match: [/^\d\d\d\d$/, 'Must be 4 digit year!'],
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
  teams: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }
});


const Season = model('Season', seasonSchema);

module.exports = Season;