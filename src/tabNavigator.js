import React, {Fragment} from 'react';
import WalletView from './WalletView';
import UpcomingView from './UpcomingView';
import SettingsView from './SettingsView';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons';


const TabNavigator = createBottomTabNavigator({
    Wallet: WalletView,
    Upcoming: UpcomingView,
    Settings: SettingsView
},{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        console.log(navigation.state);
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'WalletView') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
  

export default TabNavigator;