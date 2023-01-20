const { IAMClient } = require("@aws-sdk/client-iam");
const REGION = "us-east-1";
const iamClient = new IAMClient({ region: REGION });

module.exports = {
  iamClient,
};
