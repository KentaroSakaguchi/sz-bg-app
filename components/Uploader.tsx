import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function Uploader({}) {
  const [imageURL, setCreateObjectURL] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const getFunctionInit = getFunctions();
  const addMessageFunctions = httpsCallable(getFunctionInit, 'addMessage');


  const uploadToServer = async (data) => {
    const validateMb = 10485760	; // 10MB
    const [fileTypeJpeg, fileTypePng] = ['image/jpeg', 'image/png'];
    const  [imgTypeErrorText, imgSizeErrorText] = ['画像', '10MBまで'];

    if (data.type !== fileTypeJpeg && data.type !== fileTypePng) {
      setErrorText(imgTypeErrorText);
      setCreateObjectURL(null);
      return;
    }

    if (data.size > validateMb) {
      setErrorText(imgSizeErrorText);
      setCreateObjectURL(null);
      return;
    }

    setErrorText(null);

    if (location.href === 'http://localhost:3000/') {
      const body = new FormData();
      body.append("file", data);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
    } else {
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + data.name);
      console.log(imageRef)
      uploadBytesResumable(imageRef, data, data)
        .then((snapshot) => {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log('File metadata:', snapshot.metadata);
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
    setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
    uploadToServer(event.target.files[0]);
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
    setCreateObjectURL(URL.createObjectURL(event.dataTransfer.files[0]));
    uploadToServer(event.dataTransfer.files[0]);
  };

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
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span className="p-2">画像を選択</span>
                <input id="file-upload" name="file-upload" type="file" accept="image/jpeg,image/png" className="sr-only" onChange={upload} />
              </label>
              <p className="pl-1">or drag and drop</p>
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
        <div className="flex justify-center items-center mt-8">
          <button type="button" className="focus:outline-none w-32 py-2 rounded-md font-semibold text-white bg-indigo-500 ring-4 ring-indigo-300">Button</button>
        </div>
        <img src={imageURL} />
      </div>
    </section>
  );
}
