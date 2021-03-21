/* eslint-disable react/prop-types */
import React from 'react';

import { ComicProvider } from './comic';
import { DetailProvider } from './detail';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ComicProvider>
      <DetailProvider>{children}</DetailProvider>
    </ComicProvider>
  );
};

export default AppProvider;
