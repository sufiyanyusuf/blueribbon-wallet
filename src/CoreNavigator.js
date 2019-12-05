import React, {Fragment} from 'react';
import WalletView from './WalletView';
import ExploreView from './ExploreView';
import UpcomingView from './UpcomingView';
import SettingsView from './SettingsView';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SubscriptionPage from './SubscriptionPage';
import OrderSummary from './OrderSummary';
import { createStackNavigator } from 'react-navigation-stack';
import PaymentConfirmation from './PaymentConfirmation'
import AddLocationView from './AddLocationView'
import ProfileSetupStack from './ProfileSetupNavigator';
import SubscriptionOptionsView from './SubscriptionOptionsView'
import {Image} from 'react-native'; 

import ExploreIcon from './assets/icons/tabBarIcons/explore.png';
import SubscriptionsIcon from './assets/icons/tabBarIcons/subscriptions.png';
import UpcomingIcon from './assets/icons/tabBarIcons/upcoming.png';
import ProfileIcon from './assets/icons/tabBarIcons/profile.png';

const TabNavigator = createBottomTabNavigator({
  
  Explore: {
    screen: ExploreView,
    navigationOptions: {
      title: 'Explore',
      tabBarIcon: ({tintColor}) => (<Image
        source={ExploreIcon}
        style={{ width: 26, height: 26, resizeMode: 'contain', tintColor:tintColor  }}
      />)
    },
  },
  Wallet: {
    screen: WalletView,
    navigationOptions: {
      title: 'Wallet',
      tabBarIcon: ({tintColor}) => (<Image
        source={SubscriptionsIcon}
        style={{ width: 26, height: 26, resizeMode: 'contain', tintColor:tintColor  }}
      />)
    },
  },
  Upcoming: {
    screen: UpcomingView,
    navigationOptions: {
      title: 'Upcoming',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={UpcomingIcon}
          style={{ width: 26, height: 26, resizeMode: 'contain', tintColor:tintColor }}
        />)
    },
  },
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={ProfileIcon}
          style={{ width: 26, height: 26, resizeMode: 'contain', tintColor:tintColor}}
        />)
    },
  
    },
  },{
 
    tabBarOptions: {
      style: {
        height: 60,
        paddingTop: 10,
        borderTopColor: "#EEEFF3",
      },
      labelStyle: {
        fontFamily: "TTCommons-Regular",
        fontSize: 12,
        letterSpacing: 0.2,
        paddingTop: 2,
        marginBottom:0,
      },
      labelPosition:'below-icon',
      activeTintColor: '#2C43A3',
      inactiveTintColor: '#717585',
    },
  }
);


const CoreStack = createStackNavigator(
  { 
    Home:TabNavigator,
    LandingPage: {
      screen: SubscriptionPage,
      path: 'stores/:store/:id',
      
    },
    OrderSummary: OrderSummary,
    ProfileSetup: ProfileSetupStack,
    Confirmation:PaymentConfirmation,
    AddLocation: {
      screen: AddLocationView,
    },
    ManageSubscription: {
      screen: SubscriptionOptionsView,
    }
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

export default CoreStack;