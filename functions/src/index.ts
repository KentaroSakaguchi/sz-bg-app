import * as functions from 'firebase-functions';
import {IncomingWebhook} from '@slack/webhook';
import * as admin from 'firebase-admin';

// import * as path from 'path';
import * as sharp from 'sharp';
// const fs = require('fs');
// const os = require('os');

admin.initializeApp();
// const tempDir: string = os.tmpdir();

const webhook = new IncomingWebhook(functions.config().slack_web_hook.url);

/**
 * Slack通知用メソッド
 * @param {any} data
 */
async function sendWebhookSlack(data: string = 'sz-bg-app にお問い合わせ') {
  await webhook.send({
    text: `sz-bg-app にお問い合わせ: ${data}`,
  });
}

export const addMessage = functions.https.onCall(async (data) => {
  await sendWebhookSlack(data);
});


export const writeWebpInit = async (data: any) => {
  const metadata = {
    contentType: 'image/webp',
  };

  const bucket = admin.storage().bucket();
  const bucketFilePath = `images/${data.imageName.toLowerCase().replace('jpg', 'webp').replace('png', 'webp').replace('jpeg', 'webp')}`;
  // 画像をBase64からBufferに変換する
  const buffer = Buffer.from(data.base64, 'base64');
  const file = bucket.file(bucketFilePath);
  await file.save(buffer);
  // Cloud Storageへの画像の追加

  const upLoadStream = bucket.file(bucketFilePath).createWriteStream({metadata});
  const pipeline = sharp();
  pipeline
      .rotate()
      .webp({
        quality: 80,
      })
      .pipe(upLoadStream);

  bucket.file(bucketFilePath).createReadStream().pipe(pipeline);

  return new Promise((resolve, reject) => {
    upLoadStream.on('finish', resolve).on('error', reject);
    return bucketFilePath;
  });
};

export const writeWebp = functions.https.onCall(async (data) => {
  return await writeWebpInit(data);
});
