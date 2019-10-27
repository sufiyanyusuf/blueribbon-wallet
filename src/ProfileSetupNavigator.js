import TermsPage from './T&CView'
import UserInfoPage from './UserInfoView'
import AddLocationView from './AddLocationView'


import { createStackNavigator } from 'react-navigation-stack';

const ProfileSetupStack = createStackNavigator(
  { 

    UserInfoPage: {
      screen: UserInfoPage
  },
    TermsPage: {
        screen: TermsPage
    },
    AddLocationView: {
        screen: AddLocationView
    },

  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

export default ProfileSetupStack;