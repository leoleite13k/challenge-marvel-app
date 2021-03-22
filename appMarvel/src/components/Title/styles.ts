import styled from 'styled-components/native';

import { ITitle } from './index';

export const Text = styled.Text<ITitle>`
  font-family: 'RobotoCondensed-Bold';
  font-size: 22px;
  color: ${({ color }) => color || '#f4f4f4'};
`;
