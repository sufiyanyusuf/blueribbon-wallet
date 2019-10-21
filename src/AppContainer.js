
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import CoreStack from './CoreNavigator';
import SignInView from './SigninView';
import SubsriptionFlow from './SubscriptionPage';

export default createAppContainer(
  createSwitchNavigator(
    {
      App: {
        screen: CoreStack,
        path: 'subscribe',
      },
      Auth: {screen:SignInView},
      Checkout: SubsriptionFlow
    },
    {
      initialRouteName: 'Checkout',
    }
  )
);
