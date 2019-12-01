
const state = {
    "subscriptions":[],
    'currentOrder':[],
    'currentOrderSemantics':[],
    'currentPricing':0,
    'user':{
        'loggedIn':false,
        'token':'',
        'subscriptions':[],
        'savedSubscriptions':[],
        'upcomingOrders':[],
        'savedLocations':[],
        'defaultLocation': {},
        'newUser':false,
        'promptedForNotifications':true,
        'registeredForNotifications': false,
        'listenForNotifications': false,
        'notificationToken':'',
        'notificationTokenUploaded':false,
    }

};

  export default state;