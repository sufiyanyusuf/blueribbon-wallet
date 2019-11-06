const subscriptions = [
    {key:1,date:"date",title:"title",status:"live",count:"232"},
    {key:2,date:"date",title:"title",status:"live",count:"233"}
];
 
const state = {
    "subscriptions":subscriptions,
    'currentOrder':[],
    'currentOrderSemantics':[],
    'currentPricing':0,
    'user':{
        'loggedIn':false,
        'token':'',
        'subscriptions':[],
        'newUser':false,
        'savedSubscriptions':[],
        'upcomingOrders':[],
        'savedLocations':[],
        'defaultLocation':{}
    }

};

  export default state;