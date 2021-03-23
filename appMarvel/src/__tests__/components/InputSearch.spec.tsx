import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import InputSearch from '../../components/InputSearch';

const mockedOnChangeText = jest.fn();

describe('Comic page', () => {
  it('should be able see a comic details', () => {
    const { getByTestId } = render(
      <InputSearch onChangeText={mockedOnChangeText} />,
    );

    const inputSearch = getByTestId('input_search');

    fireEvent.changeText(inputSearch);

    expect(mockedOnChangeText).toBeCalled();
  });
});
