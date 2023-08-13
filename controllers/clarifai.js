const axios = require("axios");
/**
 * https://portal.clarifai.com/settings/profile
 */
const USER_ID = "iuliangradinaru79"; // Add your user id here

/**
 * https://portal.clarifai.com/settings/authentication (create one if necessary!)
 */
const PAT = "5866d7ab3aab4f1bb845070d958384a6"; // Add your personal access token here

/**
 * App Id is just the name of your app on the portal.
 */
const APP_ID = "my-first-application"; // Add your app id here

/**
 * Change these to whatever model and image input you want to use
 * https://help.clarifai.com/hc/en-us/articles/1500007677141-Where-to-find-your-Model-IDs-and-Model-Version-IDs
 */
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

/**
 * This is the URL for the Clarifai API
 */
const CLARIFAI_URL =
  "https://api.clarifai.com/v2/models/" +
  MODEL_ID +
  "/versions/" +
  MODEL_VERSION_ID +
  "/outputs";

const handleApiCall = async (req, res) => {
  try {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: req.body.input,
            },
          },
        },
      ],
    });
    const { data } = await axios.post(CLARIFAI_URL, raw, {
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
    });

    res.send(data);
  } catch (error) {
    console.log(error.response);

    return error.response;
  }
};

module.exports = {
  handleApiCall: handleApiCall,
};
