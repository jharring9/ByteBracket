const {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./ddbDocumentClient.cjs");

const bracketTable = "brackets";

exports.getBracket = async (username, id) => {
  const params = {
    TableName: bracketTable,
    Key: {
      username: username,
      id: id,
    },
  };
  try {
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (err) {
    return null;
  }
};

exports.getUserBrackets = async (username) => {
  const params = {
    TableName: bracketTable,
    KeyConditionExpression: "username = :a",
    ExpressionAttributeValues: {
      ":a": username,
    },
  };
  try {
    const { Items } = await ddbDocClient.send(new QueryCommand(params));
    return Items;
  } catch (err) {
    return null;
  }
};

exports.saveBracket = async (
  username,
  id,
  bracket,
  champion,
  name,
  winnerName,
  stats
) => {
  const now = Date.now().toString();
  const params = {
    TableName: bracketTable,
    Item: {
      bracket: bracket,
      champion: champion,
      username: username,
      id: id,
      name: name,
      winnerName: winnerName,
      stats: stats,
      created: now,
      lastUpdated: now,
    },
  };
  try {
    return await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    return null;
  }
};

exports.deleteBracket = async (username, id) => {
  const params = {
    TableName: bracketTable,
    Key: {
      username: username,
      id: id,
    },
  };
  try {
    return await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    return null;
  }
};
