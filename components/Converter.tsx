import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getBlob } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Converter({}) {
  const [imageURLs, setCreateObjectURLs] = useState([]);
  const [imageNames, setCreateObjectNames] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [imageCounterValue, imageCounter] = useState(0);
  const getFunctionInit = getFunctions();
  const addMessageFunctions = httpsCallable(getFunctionInit, 'addMessage');
  const writeWebpFunctions = httpsCallable(getFunctionInit, 'writeWebp');
  const validateMb = 2000000; // 1MB
  const [fileTypeJpeg, fileTypePng] = ['image/jpeg', 'image/png'];
  const [imgTypeErrorText, imgSizeErrorText, imgCountErrorText] = ['対応しているフォーマットはPNG, JPGになります', '2MBまで', '画像1枚以内でドロップしてください'];
  const [disabled, setDisabled] = useState(false);
  const [disabledText, setDisabledText] = useState('データ変換中');
  const [downloadUrl, setDownloadUrl] = useState('');

  const disabledStyle = css`
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `;

  const uploadToServer = async (data) => {

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
    setDisabled(true);
    setDisabledText('データ読み込み中');

    if (location.host === 'localhost:3000') {
      const body = new FormData();
      body.append('file', data);

      const response = await fetch('/api/file', {
        method: 'POST',
        body
      }).then(() => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = async() => {
          console.log(reader);
        }
        setDisabled(false);
        setDownloadUrl(`/${data.name}`);
        location.href = `${location.origin + location.pathname}#download`;
      });

    } else {
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + data.name);

      uploadBytesResumable(imageRef, data, data)
        .then((snapshot) => {
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            addMessageFunctions(`画像up: ${url}`);
            setDisabledText('画像変換中');
          });

          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = async() => {
            const imageBase64Data = reader.result?.toString()?.replace(/data:.*\/.*;base64,/, '');
            const imageName = data.name;
            const sendData = { base64: imageBase64Data, imageName: `webp-${imageName}` }
            writeWebpFunctions(sendData).then((v) => {
              setDisabled(false);
              setDisabledText('');
              const webpImageRef = ref(storage, 'images/' + `webp-${imageName.toLowerCase().replace('jpg', 'webp').replace('png', 'webp').replace('jpeg', 'webp')}`);
              // Get the download URL
              getBlob(webpImageRef).then((blob) => {
                setDownloadUrl(URL.createObjectURL(blob));
              });
            });
          }

        }).catch((error) => {
          console.error('Upload failed', error);
          // ...
        });
    }
  };

  const upload = (event) => {
    imageCounter(imageCounterValue + 1);
    setCreateObjectURLs([...imageURLs, URL.createObjectURL(event.target.files[0])]);
    uploadToServer(event.target.files[0]);
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

  const dragDrop = (event: React.DragEvent) => {
    event.preventDefault();
    dropStyleChange(null);

    if (event.dataTransfer.files.length > 1) {
      // 画像枚数バリデーション
      setErrorText(imgCountErrorText);
      return;
    }

    Array.from(event.dataTransfer.files).forEach((value) => {
      imageCounter((data) => data + 1);
      setCreateObjectURLs((imageURLs) => [...imageURLs, URL.createObjectURL(value)]);
      setCreateObjectNames((imageNames) => [...imageNames, value.name]);
      uploadToServer(value);
    });
  };

  return (
    <section className="mt-16">
      <h1 className="text-xl font-bold" id="upload">Upload</h1>
      <div className="relative">
        { disabled &&
          <div css={disabledStyle} className="flex justify-center items-center pb-6 bg-white">
            <LoadingButton
              loading
            />
            <span className="text-xl font-bold text-gray">{disabledText}</span>
          </div>
        }
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
              PNG, JPG up to 1MB
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
        </div>
      </div>
      {downloadUrl &&
        <div className="mt-16" id="download">
          <div className="max-w-md mx-auto flex items-center justify-center">
            <img src={downloadUrl} />
          </div>
          <div className="mt-8 flex items-center justify-center">
            <a href={downloadUrl} download className="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" type="button">Download</a>
          </div>
        </div>
      }
    </section>
  );
}
