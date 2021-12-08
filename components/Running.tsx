import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function Running({}) {

  return (
    <section className="mt-16">
      <h1 className="text-xl font-bold">Upload</h1>
    </section>
  );
}
