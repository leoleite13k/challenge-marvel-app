import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Home from '../pages/Home';
import Detail from '../pages/Detail';

const App = createSharedElementStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#323232' },
    }}
    initialRouteName="Home"
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen
      name="Detail"
      component={Detail}
      sharedElementsConfig={route => {
        const { comic, isFavorite } = route.params;

        return [
          {
            id: `${comic.id}-${isFavorite ? 'favorite' : 'bg'}`,
            animation: 'fade',
          },
          {
            id: `${comic.id}-title`,
            animation: 'fade',
          },
        ];
      }}
    />
  </App.Navigator>
);

export default Routes;
