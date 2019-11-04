import TermsPage from './T&CView'
import UserInfoPage from './UserInfoView'
import AddLocationView from './AddLocationView'


import { createStackNavigator } from 'react-navigation-stack';

const ProfileSetupStack = createStackNavigator(
  { 
    
    AddLocationView: {
      screen: AddLocationView
    },
    TermsPage: {
      screen: TermsPage
    },
    UserInfoPage: {
      screen: UserInfoPage
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

export default ProfileSetupStack;