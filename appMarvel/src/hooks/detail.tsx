import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import { IResult } from '../models/comic';

interface ISearchById {
  id: number;
}

interface DetailContextData {
  data: IResult | null;
  loading: boolean;
  searchById(filters: ISearchById): Promise<void>;
  setData: React.Dispatch<React.SetStateAction<IResult | null>>;
}

const DetailContext = createContext<DetailContextData>({} as DetailContextData);

const DetailProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const searchById = useCallback(async ({ id }) => {
    setLoading(true);
    const { data: response } = await api.get(`/comics/${id}`);
    setData(response.data.results[0]);
    setLoading(false);
  }, []);

  return (
    <DetailContext.Provider
      value={{
        data,
        loading,
        searchById,
        setData,
      }}>
      {children}
    </DetailContext.Provider>
  );
};

function useDetail(): DetailContextData {
  const context = useContext(DetailContext);

  return context;
}

export { DetailProvider, useDetail };
