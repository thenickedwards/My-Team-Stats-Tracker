const db = require('../config/connection');
const { User, League, Season, SoccerTeam, SoccerPlayer } = require('../models');
const userSeeds = require('./userSeeds.json');
const leagueSeeds = require('./leagueSeeds.json');
const seasonSeeds = require('./seasonSeeds.json');
const soccerTeamSeeds = require('./soccerTeamSeeds.json')
const soccerPLayerSeeds = require('./soccerPlayerSeeds.json')


db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    await League.deleteMany({});

    await League.create(leagueSeeds);

    await Season.deleteMany({});

    await Season.create(seasonSeeds);

    await SoccerTeam.deleteMany({});

    await SoccerTeam.create(soccerTeamSeeds);

    await SoccerPlayer.deleteMany({});

    await SoccerPlayer.create(soccerPLayerSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
