import React from 'react';

import { Text } from './styles';

export interface ITitle {
  color?: string;
}

const Title: React.FC<ITitle> = ({ color, children }) => {
  return <Text color={color}>{children}</Text>;
};

export default Title;
