import React, { useState } from 'react';

const breakpoints = [768, 1441];

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);

export const Mediaquery = mq;
