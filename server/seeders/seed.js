const db = require('../config/connection');
const { User, League, Season, SoccerTeam, SoccerPlayer, SoccerGame } = require('../models');
const userSeeds = require('./userSeeds.json');
const leagueSeeds = require('./leagueSeeds.json');
const seasonSeeds = require('./seasonSeeds.json');
const soccerTeamSeeds = require('./soccerTeamSeeds.json')
const soccerPlayerSeeds = require('./soccerPlayerSeeds.json')
const soccerGameSeeds = require('./soccerGameSeeds.json')


db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    await League.deleteMany({});

    await League.create(leagueSeeds);

    await Season.deleteMany({});

    for (let i = 0; i < seasonSeeds.length; i++) {
      const newSeasonSeed = await Season.create(seasonSeeds[i]);
      console.log(newSeasonSeed)
      try {
        await League.findOneAndUpdate(
          { _id: seasonSeeds[i].league },
          { $addToSet: { seasons: newSeasonSeed._id } },
        )
      }
      catch (err) {
        console.log(err);
      };
    }

    // await Season.create(seasonSeeds);

    await SoccerTeam.deleteMany({});

    await SoccerTeam.create(soccerTeamSeeds);

    await SoccerPlayer.deleteMany({});

    await SoccerPlayer.create(soccerPlayerSeeds);

    await SoccerGame.deleteMany({});

    await SoccerGame.create(soccerGameSeeds)

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All done adding seeds!');
  process.exit(0);
});
