const AWS = require("aws-sdk");

module.exports = (app) => {
  app.post("/v1/lambda", async (req, res) => {
    // TODO -- validate input before passing to lambda
    AWS.config.update({ region: "us-east-1" });
    const invokeLambda = async () => {
      const params = {
        FunctionName: "ByteBracket",
        Payload: JSON.stringify(req.body),
      };
      const result = await new AWS.Lambda().invoke(params).promise();
      let data = JSON.parse(result.Payload);
      let top25Schools = data["Schools"].slice(0, 25);
      data["bracket"] = generateBracket(data["Schools"].slice(0, 64));
      data["top25"] = top25Schools.map((school, index) => {
        let r = Math.floor(Math.random() * 25);
        return {
          team: school,
          rank: index + 1,
          apRank: r,
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
const generateBracket = (schools) => {
  const matchups = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      const matchup = [];
      let p = Math.floor(Math.random() * 100);
      let index = i + (j * 4);
      let seed = j + 1;
      const higherSeed = {
        rank: `No. ${seed}`,
        name: schools[index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(
            Math.random() * 35
        )}`,
        percentile: p,
        winner: false,
      };
      matchup.push(higherSeed);
      const lowerSeed = {
        rank: `No. ${17 - seed}`,
        name: schools[63 - index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(
            Math.random() * 35
        )}`,
        percentile: 100 - p,
        winner: false,
      };
      matchup.push(lowerSeed);
      matchups.push(matchup);
    }
  }
  // round of 64, 32, 16, 8, 4, and 2
  return [matchups, [], [], [], [], []];
};
