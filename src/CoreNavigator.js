import React, {Fragment} from 'react';
import WalletView from './WalletView';
import UpcomingView from './UpcomingView';
import SettingsView from './SettingsView';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SubscriptionPage from './SubscriptionPage';
import OrderSummary from './OrderSummary';
import { createStackNavigator } from 'react-navigation-stack';


const TabNavigator = createBottomTabNavigator({
    Wallet:WalletView,
    Upcoming: UpcomingView,
    Settings: SettingsView,
},{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Wallet') {
          iconName = `ios-wallet`;
        }else if (routeName === 'Upcoming') {
          iconName = `ios-calendar`;
        }else if (routeName === 'Settings') {
          iconName = `ios-cog`;
        }
        
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0A71F2',
      inactiveTintColor: 'gray',
    },
  }
);
  

const CoreStack = createStackNavigator(
  { 
    Home:TabNavigator,
    LandingPage: {
      screen: SubscriptionPage,
      path: 'stores/:id',
    },
    OrderSummary:OrderSummary,
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

export default CoreStack;