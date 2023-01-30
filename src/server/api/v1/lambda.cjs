const AWS = require("aws-sdk");

const AP_RANKINGS = {
  Purdue: 1,
  Alabama: 2,
  Houston: 3,
  Tennessee: 4,
  "Kansas State" : 5,
  Arizona: 6,
  Virginia: 7,
  UCLA: 8,
  Kansas: 9,
  Texas: 10,
  TCU: 11,
  "Iowa State": 12,
  Xavier: 13,
  Gonzaga: 14,
  Auburn: 15,
  Marquette: 16,
  Baylor: 17,
  Charleston: 18,
  Connecticut: 19,
  Miami: 20,
  "Florida Atlantic": 21,
  "Saint Mary": 22,
  Providence: 23,
  Clemson: 24,
  "New Mexico": 25
}

module.exports = (app) => {
  app.post("/v1/lambda", async (req, res) => {
    // TODO -- validate input before passing to lambda
    AWS.config.update({ region: "us-east-1" });
    const invokeLambda = async () => {
      const params = {
        FunctionName: "ComputeRankings",
        Payload: JSON.stringify(req.body),
      };
      const result = await new AWS.Lambda().invoke(params).promise();
      let data = JSON.parse(result.Payload);
      let top25Schools = data["Schools"].slice(0, 25);
      let schools = data["Schools"].slice(0, 64);
      let percentiles = data["percentiles"].slice(0, 64);
      data["bracket"] = generateBracket(schools, percentiles);
      data["top25"] = top25Schools.map((school, index) => {
        let r = school in AP_RANKINGS ? AP_RANKINGS[school] : 26;
        return {
          team: school,
          rank: index + 1,
          apRank: r !== 26 ? r : "-",
          diff: r - (index + 1),
        };
      });
      return res.status(200).send(data);
    };
    invokeLambda().catch((error) => {
      console.error("Error invoking Lambda", error);
      return res.status(400).send("Error invoking ByteBracket Lambda.");
    });
  });
};

/**
 * Generates a bracket from a list of schools.
 */
const generateBracket = (schools, percentiles) => {
  const matchups = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      const matchup = [];
      let index = i + (j * 4);
      let seed = j + 1;
      const higherSeed = {
        rank: `No. ${seed}`,
        name: schools[index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(
            Math.random() * 35
        )}`,
        percentile: percentiles[index],
        winner: false,
      };
      matchup.push(higherSeed);
      const lowerSeed = {
        rank: `No. ${17 - seed}`,
        name: schools[63 - index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(
            Math.random() * 35
        )}`,
        percentile: percentiles[63 - index],
        winner: false,
      };
      matchup.push(lowerSeed);
      matchups.push(matchup);
    }
  }
  // round of 64, 32, 16, 8, 4, and 2
  return [matchups, [], [], [], [], []];
};
