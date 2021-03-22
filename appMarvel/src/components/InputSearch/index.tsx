import React from 'react';

import { Input } from './styles';

interface IInputSearch {
  placeholder: string;
  onChangeText(text: string): void;
}

const InputSearch: React.FC<IInputSearch> = ({ placeholder, onChangeText }) => {
  return <Input placeholder={placeholder} onChangeText={onChangeText} />;
};

export default InputSearch;
