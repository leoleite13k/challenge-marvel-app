/* eslint-disable react/prop-types */
import React from 'react';

import { ComicProvider } from './comic';
import { FavoriteProvider } from './favorite';
import { DetailProvider } from './detail';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ComicProvider>
      <FavoriteProvider>
        <DetailProvider>{children}</DetailProvider>
      </FavoriteProvider>
    </ComicProvider>
  );
};

export default AppProvider;
