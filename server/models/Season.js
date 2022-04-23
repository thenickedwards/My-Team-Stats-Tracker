const { Schema, model } = require('mongoose');

const seasonSchema = new Schema({
  seasonName: {
    type: String,
    trim: true,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
    match: [/^\d\d\d\d$/, 'Must be 4 digit year!'],
  },
  endYear: {
    type: String,
    trim: true,
    match: [/^\d\d\d\d$/, 'Must be 4 digit year!'],
  },
  league:
  {
  type: Schema.Types.ObjectId,
  ref: 'League',
  },
  teams: [
    {
    type: Schema.Types.ObjectId,
    ref: 'SoccerTeam',
    }
  ]
});


const Season = model('Season', seasonSchema);

module.exports = Season;