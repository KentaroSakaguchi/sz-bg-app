/**
 * テキストコピー
 * @param {stirng} imageUrl
 */
import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { createWorker } from 'tesseract.js';
import { MakeText } from './MakeText';
import { CopyText } from './CopyText';

export default function ChangeGrayscale (imageUrl) {
  console.log(imageUrl)
  const [rexultText, setRexultText] = useState('');
  const [log, setLog] = useState({status: '', progress: 0});
  const [progressStyle, progressStyleChange] = useState(css`width: 0`);
  const [url, setUrl] = useState(imageUrl.imageUrl);

  const worker = createWorker({
    logger: (m) => {
     //  setLog({
     //    status: m.status,
     //    progress: m.progress,
     //  });
    },
  });

  // extractText
  const extractText = async (dataName) => {
    await worker.load();
    await worker.loadLanguage('jpn');
    await worker.initialize('jpn');
    const { data: { text } } = await worker.recognize(dataName);
    const textData = MakeText(text);
    setRexultText(textData);
    console.log(dataName);
    console.log(textData);
    await worker.terminate();
  };

  useEffect(() => {
    setUrl(imageUrl.imageUrl);
    progressStyleChange(css`width: ${log.progress * 100}%;`);
  }, [imageUrl, log]);

  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl.imageUrl;

    img.addEventListener('load', async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // 画像の各ピクセルをグレースケールに変換する
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < pixels.height; y++) {
          for (let x = 0; x < pixels.width; x++) {
              const i = (y * 4) * pixels.width + x * 4;
              const parseValue: any = ((pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3)
              const rgb = parseInt(parseValue, 10);
              pixels.data[i] = rgb;
              pixels.data[i + 1] = rgb;
              pixels.data[i + 2] = rgb;
          }
      }

      ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
      // console.log(canvas.toDataURL())

      const base64toBlob = (base64) => {
        const bin = atob(base64.replace(/^.*,/, ''));
        const buffer = new Uint8Array(bin.length);

        for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
        }

        try {
          const blob = new Blob([buffer.buffer], {
            type: 'image/jpeg'
          });
          return blob;

        } catch (e){
          return false;
        }
      }

      console.log('U')
      extractText(base64toBlob(canvas.toDataURL()))
    });
  }

  return (
    <p>あああ<img src={url} /></p>
  )
 };
