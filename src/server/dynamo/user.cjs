const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");

const userTable = "users";

exports.getUser = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  try {
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (err) {
    return null;
  }
};

exports.saveUser = async (user) => {
  const params = {
    TableName: userTable,
    Item: user,
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    return null;
  }
};
