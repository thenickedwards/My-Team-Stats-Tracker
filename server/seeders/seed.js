const db = require("../config/connection");

const {
  User,
  League,
  Season,
  SoccerTeam,
  SoccerPlayer,
  SoccerGame,
} = require("../models");

const userSeeds = require("./userSeeds.json");
const leagueSeeds = require("./leagueSeeds.json");
const seasonSeeds = require("./seasonSeeds.json");
const soccerTeamSeeds = require("./soccerTeamSeeds.json");
const soccerPlayerSeeds = require("./soccerPlayerSeeds.json");
const soccerGameSeeds = require("./soccerGameSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    await League.deleteMany({});

    await League.create(leagueSeeds);

    await Season.deleteMany({});

    for (let i = 0; i < seasonSeeds.length; i++) {
      const newSeasonSeed = await Season.create(seasonSeeds[i]);

      try {
        await League.findOneAndUpdate(
          { _id: seasonSeeds[i].league },
          { $addToSet: { seasons: newSeasonSeed._id } }
        );
      } catch (err) {
        console.log(err);
      }
    }

    await SoccerTeam.deleteMany({});

    for (let i = 0; i < soccerTeamSeeds.length; i++) {
      const newSoccerTeamSeed = await SoccerTeam.create(soccerTeamSeeds[i]);

      try {
        await Season.findOneAndUpdate(
          { _id: soccerTeamSeeds[i].season },
          { $addToSet: { seasons: newSoccerTeamSeed._id } }
        );
      } catch (err) {
        console.log(err);
      }
    }

    await SoccerPlayer.deleteMany({});

    for (let i = 0; i < soccerPlayerSeeds.length; i++) {
      const newSoccerPlayerSeed = await SoccerPlayer.create(
        soccerPlayerSeeds[i]
      );

      try {
        await SoccerTeam.findOneAndUpdate(
          { _id: soccerPlayerSeeds[i].team },
          { $addToSet: { roster: newSoccerPlayerSeed._id } }
        );
      } catch (err) {
        console.log(err);
      }
    }

    await SoccerGame.deleteMany({});

    await SoccerGame.create(soccerGameSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("All done adding seeds!");
  process.exit(0);
});
