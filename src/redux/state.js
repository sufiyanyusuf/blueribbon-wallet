const subscriptions = [
    {key:1,date:"date",title:"title",status:"live",count:"232"},
    {key:2,date:"date",title:"title",status:"live",count:"233"}
];
 
const state = {
    "subscriptions":subscriptions,
    'currentOrder':[],
    'currentPricing':0,
    'user':{
        'loggedIn':false,
        'subscriptions':[],
        'newUser':false,
        'savedSubscriptions':[],
        'upcomingOrders':[],
        
    }

};

  export default state;