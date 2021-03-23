import React from 'react';
import { render } from '@testing-library/react-native';

import Loader from '../../components/Loader';

describe('Loader component', () => {
  it('should be able render loader', () => {
    const { unmount } = render(<Loader />);

    unmount();
  });
});
