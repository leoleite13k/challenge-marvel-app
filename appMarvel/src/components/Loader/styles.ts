import styled from 'styled-components/native';

import { ILoader } from './index';

export const Container = styled.View<ILoader>`
  flex: 1;
  align-items: center;
  justify-content: center;

  margin-top: ${({ marginTop }) => marginTop || '0px'};
`;

export const Wrapper = styled.View`
  height: 70px;
  width: 70px;
`;
