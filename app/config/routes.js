import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home', header: () => null}}
      />
      <Stack.Screen
        name="CurrencyList"
        component={CurrencyList}
        options={{title: 'Currency List'}}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{title: 'Options'}}
      />
        <Stack.Screen
            name="Themes"
            component={Themes}
            options={{title: 'Themes'}}
        />
    </Stack.Navigator>
  );
};

export default HomeStack;
