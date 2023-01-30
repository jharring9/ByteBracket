const AWS = require("aws-sdk");

const AP_RANKINGS = {
  Purdue: 1,
  Alabama: 2,
  Houston: 3,
  Tennessee: 4,
  "Kansas State": 5,
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

let teams = ['Kansas', 'Houston', 'Connecticut', 'Gonzaga', 'Alabama', 'UCLA',
  'Arizona', 'Purdue', 'Tennessee', 'Marquette', "Saint Mary's (CA)", 'Xavier',
  'Utah State', 'San Diego State', 'Texas', 'Kansas State', 'Virginia', 'Oral Roberts',
  'Missouri', 'Nevada', 'North Carolina', 'NC State', 'Baylor', 'Auburn',
  'New Mexico', 'Arkansas', 'Iowa State', 'Florida Atlantic', 'Iowa', 'Penn State',
  'Arizona State', 'Miami (FL)', 'Creighton', 'Sam Houston State', 'Providence', 'Northwestern',
  'Nevada-Las Vegas', 'College of Charleston', 'Boise State', 'Southern Utah', 'Duke', 'Rutgers',
  'Wisconsin', 'Liberty', 'Michigan State', 'TCU', 'Memphis', 'Central Florida',
  'Clemson', 'Santa Clara', 'West Virginia', 'Illinois', 'Ohio State', 'Kent State',
  'Cincinnati', 'Oklahoma', 'Maryland', 'Southern California', 'Utah Valley', 'Indiana',
  'Michigan', 'Florida', 'UAB', 'Oregon']

module.exports = (app) => {
  app.post("/v1/lambda", async (req, res) => {
    // TODO -- validate input before passing to lambda
    AWS.config.update({region: "us-east-1"});
    const invokeLambda = async () => {
      const params = {
        Payload: JSON.stringify(req.body),
        FunctionName: "ComputeRankings",
      };
      const result = await new AWS.Lambda().invoke(params).promise();
      let data = JSON.parse(result.Payload);
      let top25Schools = data["Schools"].slice(0, 25);
      let schools = data["Schools"]
      let percentiles = data["percentiles"]
      let s2p = {};
      schools.forEach((school, index) => {
            s2p[school] = percentiles[index];
          }
      )
      data["bracket"] = generateBracket(s2p);
      data["top25"] = top25Schools.map((school, index) => {
        let r = school in AP_RANKINGS ? AP_RANKINGS[school] : 26;
        return {
          team: school, rank: index + 1, apRank: r !== 26 ? r : "-", diff: r - (index + 1),
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
const generateBracket = (s2p) => {
  const matchups = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      const matchup = [];
      let index = i + (j * 4);
      let seed = j + 1;

      const higherSeed = {
        rank: `No. ${seed}`,
        name: teams[index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(Math.random() * 35)}`,
        percentile: s2p[teams[index]],
        winner: false,
      };
      matchup.push(higherSeed);
      const lowerSeed = {
        rank: `No. ${17 - seed}`,
        name: teams[63 - index],
        record: `${Math.floor(Math.random() * 35)}-${Math.floor(Math.random() * 35)}`,
        percentile: s2p[teams[63 - index]],
        winner: false,
      };
      matchup.push(lowerSeed);
      matchups.push(matchup);
    }
  }
  // round of 64, 32, 16, 8, 4, and 2
  return [matchups, [], [], [], [], []];
};
