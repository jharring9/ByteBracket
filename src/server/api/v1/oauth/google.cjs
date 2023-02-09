const querystring = require("querystring");
const axios = require("axios");
const userDB = require("../../../dynamo/user.cjs");
//TODO JD -- replace client ID and client secret with yours
const CLIENT_ID =
  "878429727576-sns97cnt3m37nntv03trkakhfi9uos3b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const SERVER_ROOT_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://bytebracket.io";
const REDIRECT_URI = "v1/oauth/google/callback";
const UI_RETURN_URI = "/account";

// todo JH -- https://www.gethugames.in/2012/04/authentication-and-authorization-for-google-apis-in-javascript-popup-window-tutorial.html

module.exports = (app) => {
  app.get("/v1/oauth/google", (req, res) => {
    return res.send(getGoogleAuthURL());
  });

  app.get(`/${REDIRECT_URI}`, async (req, res) => {
    const code = req.query.code;
    const { id_token, access_token } = await getTokens({
      code,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    });

    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error.message);
      });

    /* Try to find user in DynamoDB - if it doesn't exist, create it */
    const dynamoUser = await userDB.getUser(googleUser.email.toLowerCase());
    if (!dynamoUser?.username) {
      const user = {
        // TODO JD/JH -- do we want email to be their username? if not, we need a new react page to ask for a username
        username: googleUser.email.toLowerCase(),
        email: googleUser.email.toLowerCase(),
        first: googleUser.given_name,
        last: googleUser.family_name,
      };
      if (!(await userDB.saveUser(user))) {
        return res
          .status(503)
          .send({ error: "Server error. Please try again." });
      }
    }
    req.session.user = {
      first: dynamoUser?.first || googleUser.given_name,
      last: dynamoUser?.last || googleUser.family_name,
      username: dynamoUser?.username || googleUser.email,
      email: dynamoUser?.email || googleUser.email,
    };
    return res.redirect(UI_RETURN_URI);
  });
};

/**
 * Create OAuth URL to redirect user to Google for authentication.
 */
function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    client_id: CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

/**
 * Exchange authorization code for access token.
 */
async function getTokens({ code, clientId, clientSecret, redirectUri }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}