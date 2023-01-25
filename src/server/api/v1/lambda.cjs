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
      let top25Schools = data['Schools'].slice(0,25)
      data['bracket'] = generateBracket(data['Schools'].slice(0,64));
      data['top25'] = top25Schools.map((school, index) => {
        let r = Math.floor(Math.random()*25)
            return ({
              team: school,
              rank: index + 1,
              apRank: r,
              diff: r - (index + 1),
            })
          }
      );
      return res.status(200).send(data);
    };
    invokeLambda().catch((error) => {
      console.error("Error invoking Lambda", error);
      return res.status(400).send("Error invoking ByteBracket Lambda.");
    });

    // const response = {
    //   bracket: generateBracket(),
    //   top25: generateTop25(),
    // };

    // const response = {
    //   bracket: generateBracket(),
    //   schools: generateTop25(),
    // };
    // res.send(response);
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
const generateBracket = (schools) => {
  const matchups = [];
  for (let i = 0; i < 32; i++) {
    const matchup = [];
    const higherSeed = {
      rank: `No. ${Math.ceil((i+ 1) / 4)}`,
      name: schools[i],
      record: `${Math.floor(Math.random() * 35)}-${Math.floor(
        Math.random() * 35
      )}`,
      percentile: Math.floor(Math.random() * 100),
      winner: false,
    }
    matchup.push(higherSeed);
    const lowerSeed = {
      rank: `No. ${Math.ceil((64 - (i+ 1)) / 4)}`,
      name: schools[64-i - 1],
      record: `${Math.floor(Math.random() * 35)}-${Math.floor(
          Math.random() * 35
      )}`,
      percentile: Math.floor(Math.random() * 100),
      winner: false,
    }
    matchup.push(lowerSeed);
    matchups.push(matchup);
  }
  // round of 64, 32, 16, 8, 4, and 2
  return [matchups, [], [], [], [], []];
};
