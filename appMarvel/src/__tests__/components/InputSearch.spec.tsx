import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import InputSearch from '../../components/InputSearch';

const mockedOnChangeText = jest.fn();

describe('InputSearch component', () => {
  it('should be able search in a list', () => {
    const { getByTestId } = render(
      <InputSearch onChangeText={mockedOnChangeText} />,
    );

    const inputSearch = getByTestId('input_search');

    fireEvent.changeText(inputSearch);

    expect(mockedOnChangeText).toBeCalled();
  });
});
