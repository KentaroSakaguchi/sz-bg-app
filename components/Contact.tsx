// import firebase from '../src/firebase';
import React, { useEffect, useState } from 'react';
// import isEmail from 'validator/lib/isEmail';

// 認証
// const init = (account: any, password: any) => {
//   firebase.auth().signInWithEmailAndPassword(account, password)
//     .then((userCredential) => {
//       return true;
//     })
//     .catch((error) => {
//       console.log('error')
//       console.log(error)
//       return false;
//     });
// };

// init(process.env.MAIL_ACCOUNT, process.env.MAIL_PASSWORD);

// firebase functions
// const addMessageFunctions = firebase.functions().httpsCallable('addMessage');

export default function Contact() {
  // const [modalShow, setModal] = useState(false);
  // const [disabledButton, setButton] = useState(true);
  // const [emailError, setEmailError] = useState(true);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   // useStateが実行された後に実行される関数
  //   emailError && name.length && email.length && message.length ? setButton(false) : setButton(true);
  // }, [name, email, message]);

  // const handleNameChange = (e) => {
  //   setName(() => e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(() => e.target.value);
  //   setEmailError(isEmail(e.target.value));
  // };

  // const handleMessageChange = (e) => {
  //   setMessage(() => e.target.value);
  // };

  // const close = () => {
  //   setModal(false);
  // };

  // const submit = () => {
  //   firebase.firestore().collection('mail').add({
  //     to: email,
  //     bcc: 'info.shizukuya@gmail.com',
  //     message: {
  //       subject: 'Shizukuya.orgにお問合せ頂き、誠にありがとうございます。 / Thank you for your inquiry.',
  //       text: `お問合せ内容 / Inquiry content : \n\n${message}\n\nメールアドレス / E-mail Address : ${email}`,
  //     }
  //   }).then(() => {
  //     setModal(true);
  //     addMessageFunctions(`お問合せ内容 / Inquiry content : \n\n${message}\n\nメールアドレス / E-mail Address : ${email}`);
  //   }).catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
  // };

  return (
    <section className="mt-24">
      <h1 className="text-xl font-bold">Contact</h1>
      <div className="mt-4">
        <p className="font-medium text-gray-900 truncate">弊社へのお問い合わせは 下記フォームにご記入の上 送信ください。</p>
        <div className="mt-4">
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">お名前 / Name</label>
            <input type="text" name="email-address" id="email-address" placeholder="お名前 / Name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mt-8 col-span-6 sm:col-span-4">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">メールアドレス / E-mail Address</label>
            <input type="text" name="email-address" id="email-address" placeholder="メールアドレス / E-mail Address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mt-8">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            メッセージ / Message
            </label>
            <div className="mt-1">
              <textarea id="about" name="about" rows={3} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex justify-center items-center">
              <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* {modalShow && <div className="">
        <div className="">
        <button type="button" className="" onClick={close}>close</button>
          <div className="">
            <p className="">お問合せ頂き、誠にありがとうございます。<br />
            お問い合わせ内容を確認し、必要のある場合はこちらから折り返し連絡いたします。よろしくお願いいたします。</p>
            <p className="">Thank you for your inquiry.<br />
            We will check the contents of your inquiry and will contact you if necessary. Thank you.</p>
          </div>
        </div>
        <div className=""></div>
      </div>
      } */}
    </section>
  );
}
