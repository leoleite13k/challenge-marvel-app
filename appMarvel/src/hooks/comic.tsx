import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import { IResponseData } from '../models/comic';
import { ICharacter } from '../models/character';

interface ISearchByChar {
  char: string;
}

interface ISearch {
  limit: number;
  character?: ICharacter | null;
}

interface ComicContextData {
  data: IResponseData;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  characterFilter: ICharacter | null;
  setCharacterFilter: React.Dispatch<React.SetStateAction<ICharacter | null>>;
  search(filters: ISearch): Promise<void>;
  searchByChar(filters: ISearchByChar): Promise<ICharacter[]>;
}

const ComicContext = createContext<ComicContextData>({} as ComicContextData);

const ComicProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IResponseData>({} as IResponseData);
  const [loading, setLoading] = useState<boolean>(true);
  const [characterFilter, setCharacterFilter] = useState<ICharacter | null>(
    null,
  );

  const search = useCallback(async ({ limit, character = null }) => {
    const newLimit = limit * 10;

    const { data: response } = await api.get(
      `/comics?format=comic&limit=${newLimit}&orderBy=title${
        character ? `&characters=${character.id}` : ''
      }`,
    );

    setData(response?.data);
  }, []);

  const searchByChar = useCallback(async ({ char }): Promise<ICharacter[]> => {
    const { data: responseChar } = await api.get(
      `/characters?limit=100&nameStartsWith=${char}`,
    );

    return responseChar.data.results;
  }, []);

  return (
    <ComicContext.Provider
      value={{
        data,
        loading,
        setLoading,
        characterFilter,
        setCharacterFilter,
        search,
        searchByChar,
      }}>
      {children}
    </ComicContext.Provider>
  );
};

function useComic(): ComicContextData {
  const context = useContext(ComicContext);

  if (!context) {
    throw new Error('useComic must be used within an ComicProvider');
  }

  return context;
}

export { ComicProvider, useComic };
