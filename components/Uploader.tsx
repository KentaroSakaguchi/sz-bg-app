import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function Uploader({}) {
  const [imageURLs, setCreateObjectURLs] = useState([]);
  const [imageNames, setCreateObjectNames] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [imageCounterValue, imageCounter] = useState(0);
  const getFunctionInit = getFunctions();
  const addMessageFunctions = httpsCallable(getFunctionInit, 'addMessage');
  const validateMb = 10000000; // 10MB
  const [fileTypeJpeg, fileTypePng] = ['image/jpeg', 'image/png'];
  const  [imgTypeErrorText, imgSizeErrorText, imgCountErrorText] = ['画像', '10MBまで', '5枚まで'];

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
    console.log(imageCounterValue)

    if (location.host === 'localhost:3000') {
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
    imageCounter(imageCounterValue + 1);
    setCreateObjectURLs([...imageURLs, URL.createObjectURL(event.target.files[0])]);
    uploadToServer(event.target.files[0]);
    setCreateObjectNames([...imageNames, event.target.files[0].name]);
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

    if (event.dataTransfer.files.length > 5) {
      setErrorText(imgCountErrorText);
      return;
    }

    Array.from(event.dataTransfer.files).forEach((value: any) => {
      imageCounter((data) => data + 1);
      setCreateObjectURLs((imageURLs) => [...imageURLs, URL.createObjectURL(value)]);
      setCreateObjectNames((imageNames) => [...imageNames, value.name]);
      uploadToServer(value);
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
    // useStateが実行された後に実行される関数
    console.log(imageCounterValue)
  }, [imageNames]);

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
        {imageURLs.length !== 0 && <h1 className="text-xl font-bold">Upload images</h1>}
        {imageURLs && imageURLs.map((data: any, index: number) => (
          <div className="mt-10 relative" key={index}>
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
