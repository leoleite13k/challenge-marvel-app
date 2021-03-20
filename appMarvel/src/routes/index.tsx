import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Home from '../pages/Home';
import Comic from '../pages/Comic';

const App = createSharedElementStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#323232' },
    }}
  >
    <App.Screen name="home" component={Home} />
    <App.Screen name="Comic" component={Comic} />
  </App.Navigator>
);

export default Routes;
