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
      return res.status(200).send(JSON.parse(result.Payload));
    };
    invokeLambda().catch((error) => {
      console.error("Error invoking Lambda", error);
      return res.status(400).send("Error invoking ByteBracket Lambda.");
    });
  });
};
