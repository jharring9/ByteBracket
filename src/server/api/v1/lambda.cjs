const AWS = require("aws-sdk");
const { iamClient } = require("../../awsClient");
const { GetRoleCommand } = require("@aws-sdk/client-iam");

module.exports = (app) => {
  app.post("/v1/lambda", async (req, res) => {
    // TODO -- validate input before passing to lambda
    try {
      await iamClient.send(
        new GetRoleCommand({ RoleName: "ByteBracketLambdaInvocationRole" })
      );
      console.log("Connected to AWS IAM");
    } catch (err) {
      console.log("Error configuring AWS IAM", err);
      return res.status(400).send("Error configuring AWS IAM.");
    }
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
