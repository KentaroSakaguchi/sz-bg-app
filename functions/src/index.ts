import * as functions from "firebase-functions";
import {IncomingWebhook} from "@slack/webhook";
// import axios from "axios";

const webhook = new IncomingWebhook(functions.config().slack_web_hook.url);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/**
 * Slack通知用メソッド
 * @param {any} data
 */
async function sendWebhookSlack(data: any = "sz-bg-app にお問い合わせ") {
  await webhook.send({
    text: `sz-bg-app にお問い合わせ: ${data}`,
  });
}

/**
 * deploy github actions通知用メソッド
 * @param {any} data
 */
// async function deployStart() {
//   axios.post("https://api.github.com/repos/shizukuya/webdevelopers/actions/workflows/submit-deploy.yml/dispatches", {
//     ref: "main",
//   }, {
//     headers: {
//       Authorization: `token ${functions.config().git_hub_web_hook.token}`,
//       Accept: "application/vnd.github.v3+json",
//     },
//   })
//       .then(function(response: any) {
//         console.log(response);
//         console.log("deploy start!");
//       })
//       .catch(function(error: any) {
//         console.log(error);
//       });
// }

export const addMessage = functions.https.onCall(async (data) => {
  await sendWebhookSlack(data);
});

// export const setDeploy = functions.https.onCall(async (data, context) => {
//   await deployStart();
// });
