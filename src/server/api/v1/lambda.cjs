const AWS = require("aws-sdk");

module.exports = (app) => {
  app.post("/v1/lambda", async (req, res) => {
    // TODO -- validate input before passing to lambda
    // AWS.config.update({ region: "us-east-1" });
    // const invokeLambda = async () => {
    //   const params = {
    //     FunctionName: "ByteBracket",
    //     Payload: JSON.stringify(req.body),
    //   };
    //   const result = await new AWS.Lambda().invoke(params).promise();
    //   return res.status(200).send(JSON.parse(result.Payload));
    // };
    // invokeLambda().catch((error) => {
    //   console.error("Error invoking Lambda", error);
    //   return res.status(400).send("Error invoking ByteBracket Lambda.");
    // });

    const response = {
      bracket: generateBracket(),
      top25: generateTop25(),
    };
    res.send(response);
  });
};

/**
 * Generates a random mocked top 25.
 */
const generateTop25 = () => {
  let mockTableData = [];
  for (let i = 0; i < 25; i++) {
    let apRank = Math.floor(Math.random() * 25) + 1;
    mockTableData.push({
      team: `Team ${i + 1}`,
      rank: i + 1,
      apRank: apRank,
      diff: apRank - (i + 1),
    });
  }
  return mockTableData;
};

/**
 * Generates a random mocked bracket.
 */
const generateBracket = () => {
  const matchups = [];
  for (let i = 0; i < 32; i++) {
    const matchup = [];
    const team1Seed = (i % 8) + 1;
    for (let j = 0; j < 2; j++) {
      const team = {
        rank: `No. ${j === 0 ? team1Seed : 17 - team1Seed}`,
        name: `Team ${Math.floor(Math.random() * 100)}`,
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(
          Math.random() * 35
        )}`,
        percentile: Math.floor(Math.random() * 100),
        winner: false,
      };
      matchup.push(team);
    }
    matchups.push(matchup);
  }

  // round of 64, 32, 16, 8, 4, and 2
  return [matchups, [], [], [], [], []];
};
