import * as functions from "firebase-functions";
import {IncomingWebhook} from "@slack/webhook";

// import {Storage} from "@google-cloud/storage";
// import * as path from "path";
// import * as sharp from "sharp";

// const THUMB_MAX_WIDTH = 200;
// const THUMB_MAX_HEIGHT = 200;

// const gcs = new Storage();

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

export const addMessage = functions.https.onCall(async (data) => {
  await sendWebhookSlack(data);
});

// export const grayscaleImage = functions.storage.object()
//     .onFinalize(async (object: any) => {
//       const fileBucket = object.bucket; // The Storage bucket that contains the file.
//       const filePath = object.name; // File path in the bucket.
//       const contentType = object.contentType; // File content type.

//       // Exit if this is triggered on a file that is not an image.
//       if (!contentType.startsWith("image/")) {
//         functions.logger.log("This is not an image.");
//         return null;
//       }

//       // Get the file name.
//       const fileName = path.basename(filePath);
//       // Exit if the image is already a thumbnail.
//       if (fileName.startsWith("thumb_")) {
//         functions.logger.log("Already a Thumbnail.");
//         return null;
//       }

//       // Download file from bucket.
//       const bucket = gcs.bucket(fileBucket);

//       const metadata = {
//         contentType: contentType,
//       };
//       // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
//       const thumbFileName = `thumb_${fileName}`;
//       const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
//       // Create write stream for uploading thumbnail
//       const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

//       // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
//       const pipeline = sharp();
//       pipeline
//           .rotate()
//           .grayscale()
//           .pipe(thumbnailUploadStream);

//       bucket.file(filePath).createReadStream().pipe(pipeline);

//       return new Promise((resolve, reject) =>
//         thumbnailUploadStream.on("finish", resolve).on("error", reject));
//     });

