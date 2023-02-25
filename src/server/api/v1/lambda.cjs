const AWS = require("aws-sdk");
const {
  TEAMS,
  LOGOS,
  AP_RANKINGS,
} = require("../../../../config/BYTEBRACKET_CONFIG");

module.exports = (app) => {
  app.get("/v1/logos", async (req, res) => {
    res.send(LOGOS);
  });

  app.get("/v1/field", async (req, res) => {
    res.send(generateField(null));
  });

  app.post("/v1/lambda", async (req, res) => {
    try {
      AWS.config.update({ region: "us-east-1" });
      const invokeLambda = async () => {
        const params = {
          Payload: JSON.stringify(req.body),
          FunctionName: "ComputeRankings",
        };
        const result = await new AWS.Lambda().invoke(params).promise();
        let data = JSON.parse(result.Payload);
        let top25Schools = data["Schools"].slice(0, 25);
        let Ws = data["W"].slice(0, 25);
        let Ls = data["L"].slice(0, 25);
        let schools = data["Schools"];
        let percentiles = data["percentiles"];
        let s2p = {};
        schools.forEach((school, index) => {
          s2p[school] = percentiles[index];
        });
        data["field"] = generateField(s2p);
        data["top25"] = top25Schools.map((school, index) => {
          let r = school in AP_RANKINGS ? AP_RANKINGS[school] : 26;
          return {
            team: school,
            rank: index + 1,
            W: Ws[index],
            L: Ls[index],
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
    } catch (err) {
      console.error("Error invoking Lambda: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });
};

/**
 * Generate the field of teams for the bracket.
 */
const generateField = (s2p) => {
  return TEAMS.map((team, index) => ({
    name: team,
    seed: (index % 16) + 1,
    record: `${Math.floor(Math.random() * 35)}-${Math.floor(
      Math.random() * 35
    )}`,
    percentile: s2p ? s2p[team] : null,
  }));
};
