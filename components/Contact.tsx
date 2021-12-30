import React, { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import isEmail from 'validator/lib/isEmail';

export default function Contact() {
  const getFunctionInit = getFunctions();
  const addMessageFunctions = httpsCallable(getFunctionInit, 'addMessage');
  const [modalShow, setModal] = useState(false);
  const [disabledButton, setButton] = useState(true);
  const [emailError, setEmailError] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // useStateが実行された後に実行される関数
    emailError && name.length && email.length && message.length ? setButton(false) : setButton(true);
  }, [name, email, message]);

  const handleNameChange = (e) => {
    setName(() => e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(() => e.target.value);
    setEmailError(isEmail(e.target.value));
  };

  const handleMessageChange = (e) => {
    setMessage(() => e.target.value);
  };

  const close = () => {
    setModal(false);
  };

  const submit = () => {
    addMessageFunctions(`お問合せ内容 / Inquiry content : \n\n${message}\n\nメールアドレス / E-mail Address : ${email}`);
    setModal(true);
  };

  return (
    <section className="mt-24" id="contact">
      <h1 className="text-xl font-bold">Contact</h1>
      <div className="mt-4">
        <p className="font-medium text-gray-900 truncate">弊社へのお問い合わせは 下記フォームにご記入の上 送信ください。</p>
        <div className="mt-4">
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">お名前 / Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleNameChange}
              placeholder="お名前 / Name"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-8 col-span-6 sm:col-span-4">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">メールアドレス / E-mail Address</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleEmailChange}
              placeholder="メールアドレス / E-mail Address"
              autoComplete="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {!emailError &&
              <div className="alert alert-error mt-2">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                  <label>メールアドレスの形式をご確認ください。/ Please check the format of your email address.</label>
                </div>
              </div>
            }
          </div>
          <div className="mt-8">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            メッセージ / Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                onChange={handleMessageChange}
                name="message"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="メッセージ / Message"
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex justify-center items-center">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={submit}
                disabled={disabledButton}
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
      {modalShow &&
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={close}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" x-description="Heroicon name: outline/refresh" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    お問合せ頂き、誠にありがとうございます。 <br /> Thank you for your inquiry.
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      お問い合わせ内容を確認し、必要のある場合はこちらから折り返し連絡いたします。よろしくお願いいたします。
                      </p>
                      {/* <p className="text-sm text-gray-500 mt-2">
                      We will check the contents of your inquiry and will contact you if necessary. Thank you.
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Deactivate
                </button> */}
                <button type="button" onClick={close} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
}
