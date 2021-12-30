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
   const [rexultText, setRexultText] = useState('');
   const [log, setLog] = useState({status: '', progress: 0});
   const [progressStyle, progressStyleChange] = useState(css`width: 0`);
   const [url, setUrl] = useState(imageUrl.imageUrl);
   let flg = true;
   console.log('Uuuu2');
   // extractText
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

   if (typeof window !== 'undefined') {
     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');
     const img = new Image();
     img.src = imageUrl.imageUrl;

     const b = img.addEventListener('load', async () => {
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

       base64toBlob(canvas.toDataURL())
       console.log(flg)
       if (flg) {
        extractText(base64toBlob(canvas.toDataURL()))
       }
       flg = false;
     });
   }

   useEffect(() => {
     console.log(log)
     setRexultText(rexultText);
     progressStyleChange(css`width: ${log.progress * 100}%;`);
   }, [url, log, progressStyleChange, rexultText]);

   const [copyStyle, copyStyleChange] = useState(null);

   const copy = (textdata) => {
     CopyText(textdata);
     copyStyleChange(css`opacity: 1; visibility: visible;`);

     setTimeout(() => {
       copyStyleChange(css`opacity: 0; visibility: hidden;`);
     }, 2000)
   };

   return (
     <>
       {log.status &&
         <div className="relative pt-1 mt-16">
           <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
             <div css={progressStyle} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
           </div>
           {
             log.status === 'recognizing text' && <div className="flex text-sm text-gray-600 justify-center items-center">
               <p className="text-xl font-bold">画像解析中: {Math.floor(log.progress * 100)}%</p>
             </div>
           }
           {
             log.status !== 'recognizing text' && <div className="flex text-sm text-gray-600 justify-center items-center">
               <p className="text-xl font-bold">画像読み取り中</p>
             </div>
           }
         </div>
       }
       <div className="relative">
         {rexultText &&
           <div>
             <h1 className="mt-16 text-xl font-bold">Results / 出力結果</h1>
             <div className="mt-8 bg-indigo-600 rounded-xl py-3 px-3">
               <p className="whitespace-pre-wrap mt-2 text-lg text-white">{rexultText}</p>
             </div>
             <div className="mt-8 flex lg:flex-shrink-0 justify-center items-center">
               <div className="ml-3 inline-flex rounded-md shadow">
                 <button onClick={() => copy(rexultText)} type="button" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                   テキストをコピーする
                 </button>
               </div>
             </div>
           </div>
         }
         <div className="h-32 absolute inset-0 z-20 m-auto py-3 px-3 flex items-center justify-center bg-indigo-300 rounded-xl transition-all ease-in-out opacity-0 invisible" css={copyStyle}>
           <p className="font-semibold">テキストをコピーしました</p>
         </div>
       </div>
     </>
   )
 };
