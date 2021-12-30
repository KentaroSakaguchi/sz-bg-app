import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import axios from 'axios';
import { createWorker } from 'tesseract.js';
import { StartCamera, CameraImageStyle, CameraButtonStyle, CameraCloseButtonStyle } from './UploaderModules/StartCamera';
import { MakeText } from './UploaderModules/MakeText';
import { CopyText } from './UploaderModules/CopyText';

export default function Uploader({}) {
  const [imageURLs, setCreateObjectURLs] = useState([]);
  const [imageNames, setCreateObjectNames] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [imageCounterValue, imageCounter] = useState(0);
  const getFunctionInit = getFunctions();
  const addMessageFunctions = httpsCallable(getFunctionInit, 'addMessage');
  const validateMb = 10000000; // 10MB
  const [fileTypeJpeg, fileTypePng] = ['image/jpeg', 'image/png'];
  const [imgTypeErrorText, imgSizeErrorText, imgCountErrorText] = ['対応しているフォーマットはPNG, JPGになります', '10MBまで', '画像1枚のみドロップしてください'];
  const [rexultText, setRexultText] = useState('');
  const [camera, setCamera] = useState(false);
  const [progressStyle, progressStyleChange] = useState(css`width: 0`);
  const [log, setLog] = useState({status: '', progress: 0});

  const uploadToServer = async (data, url) => {

    if (data.type !== fileTypeJpeg && data.type !== fileTypePng) {
      setErrorText(imgTypeErrorText);
      setCreateObjectURLs([]);
      setCreateObjectNames([]);
      return;
    }

    if (data.size > validateMb) {
      setErrorText(imgSizeErrorText);
      setCreateObjectURLs([]);
      setCreateObjectNames([]);
      return;
    }

    setErrorText(null);
    // console.log(imageCounterValue)

    // extractText
    const worker = createWorker({
      logger: (m) => {
        setLog({
          status: m.status,
          progress: m.progress,
        });
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
      await worker.terminate();
    };

    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = url;

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

        extractText(base64toBlob(canvas.toDataURL()))
      });
    }

    if (location.host === 'localhost:3000') {
      const body = new FormData();
      body.append('file', data);

      const response = await fetch('/api/file', {
        method: 'POST',
        body
      }).then(() => {
        // console.log(location.href + data.name)
        // extractText(`${location.href}/output.jpg`);
      });

    } else {
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + data.name);

      uploadBytesResumable(imageRef, data, data)
        .then((snapshot) => {
          // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          // console.log('File metadata:', snapshot.metadata);
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at', url);
            addMessageFunctions(`画像up: ${url}`);
          });

        }).catch((error) => {
          console.error('Upload failed', error);
          // ...
        });
    }

  };

  const upload = (event) => {
    imageCounter(imageCounterValue + 1);
    setCreateObjectURLs([...imageURLs, URL.createObjectURL(event.target.files[0])]);
    uploadToServer(event.target.files[0], URL.createObjectURL(event.target.files[0]));
    setCreateObjectNames([...imageNames]);
  };

  const [dropStyle, dropStyleChange] = useState(null);

  const dragStart = (event) => {
    event.preventDefault();
    dropStyleChange(css`opacity: 0.5;`);
  };

  const dragLeave = () => {
    dropStyleChange(null);
  };

  const dragDrop = (event) => {
    event.preventDefault();
    dropStyleChange(null);

    if (event.dataTransfer.files.length > 1) {
      setErrorText(imgCountErrorText);
      return;
    }

    Array.from(event.dataTransfer.files).forEach((value: any) => {
      imageCounter((data) => data + 1);
      setCreateObjectURLs((imageURLs) => [...imageURLs, URL.createObjectURL(value)]);
      setCreateObjectNames((imageNames) => [...imageNames, value.name]);
      uploadToServer(value, URL.createObjectURL(value));
    });
  };

  const removeImg = (index) => {
    const deleteImg = imageNames.splice(index, 1)[0];
    const deleteUrl = imageURLs.splice(index, 1)[0];
    setCreateObjectNames((state) => state.filter((item) => item !== deleteImg));
    setCreateObjectURLs((state) => state.filter((item) => item !== deleteUrl));
    imageCounter(imageCounterValue - 1);
  };

  useEffect(() => {
    // console.log(log)
    progressStyleChange(css`width: ${log.progress * 100}%;`);
    if (log.status === 'recognizing text' && log.progress * 100 === 100) {
      location.href = `${location.origin}/#result`;
    }

    camera ? StartCamera('open') : StartCamera('close');
  }, [setCreateObjectNames, setCreateObjectURLs, camera, log, progressStyleChange]);

  const [copyStyle, copyStyleChange] = useState(null);

  const copy = (textdata) => {
    CopyText(textdata);
    copyStyleChange(css`opacity: 1; visibility: visible;`);

    setTimeout(() => {
      copyStyleChange(css`opacity: 0; visibility: hidden;`);
    }, 2000)
  };

  // const cameraInit = (bool) => {
  //   setCamera(bool);
  // };

  return (
    <section className="mt-16">
      <h1 className="text-xl font-bold" id="upload">Upload</h1>
      <div>
        <div
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-all"
          onDragOver={dragStart}
          onDrop={dragDrop}
          onDragLeave={dragLeave}
          css={dropStyle}
          >
          <div className="h-60 flex flex-col justify-center items-center space-y-1">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <p className="text-xl font-bold">drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG up to 10MB
            </p>
          </div>
        </div>
        {errorText &&
          <div className="alert alert-error mt-2">
            <div className="flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
              <label>{errorText}</label>
            </div>
          </div>
        }
        <div className="mt-8 flex lg:flex-shrink-0 justify-center items-center">
          <label className="inline-flex rounded-md shadow" htmlFor="file-upload">
            <span className="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">画像を選択</span>
            <input id="file-upload" name="file-upload" type="file" accept="image/jpeg,image/png" className="sr-only" onChange={upload} />
          </label>
          {/* <div className="ml-3 inline-flex rounded-md shadow">
            <button onClick={() => cameraInit(true)} type="button" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
              カメラを起動
            </button>
          </div>
          {camera &&
            <div>
              <canvas id="canvas" css={CameraImageStyle} width={window.innerWidth} height={window.innerHeight}></canvas>
              <button type="button" css={CameraButtonStyle} onClick={() => { StartCamera('take') }}>撮影</button>
              <button type="button" css={CameraCloseButtonStyle} onClick={() => cameraInit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.93 93.93">
                  <path d="M228.8,366.15l38.43-38.42a5,5,0,0,0-7.08-7.08l-38.42,38.43L183.3,320.65a5,5,0,1,0-7.07,7.08l38.42,38.42-38.42,38.43a5,5,0,1,0,7.07,7.07l38.43-38.42,38.42,38.42a5,5,0,1,0,7.08-7.07Z" transform="translate(-174.76 -319.19)" />
              </svg>
              </button>
              <video className="hidden" id="camera"></video>
            </div>
          } */}
        </div>
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
        <div className="relative" id="result">
          {rexultText &&
            <div>
              <h1 className="mt-16 text-xl font-bold">Results / 出力結果</h1>
              <p className="mt-4">コピーボタンは下部にあります</p>
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
        {/* {imageURLs.length !== 0 && <h1 className="mt-16 text-xl font-bold">Upload images</h1>} */}
        {/* {imageURLs && imageURLs.map((data: any, index: number) => (
          <div className="mt-10 relative" key={index}>
            <dl className="space-y-10 md:space-y-0">
              <div className="absolute left-0 z-10">
                <button type="button" onClick={() => removeImg(index)} className="bg-indigo-300 -mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative h-48">
                <dt>
                  <div className="overflow-hidden absolute flex items-center justify-center h-48 w-48 rounded-md bg-indigo-500 text-white">
                    <img src={data} />
                  </div>
                  <p className="ml-52 text-lg leading-6 font-medium text-gray-900">{imageNames[index]}</p>
                </dt>
                <dd className="mt-2 ml-52 text-base text-gray-500">
                  こちらの画像のテキストを抽出します。
                </dd>
              </div>
            </dl>
          </div>
        ))} */}
      </div>
    </section>
  );
}
