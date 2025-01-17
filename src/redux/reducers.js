import Actions from './action';
import calculatePricing from '../utils/Pricing'

const orderReducer = (state,action) => {

    switch (action.type){

        case Actions.orders.updateCurrentOrder :
            const _state = state.filter (order => order.id != action.order.id)
            return (_state.concat([action.order]))
          
        default:
            return state

    }

}

const orderSemanticsReducer = (state,action) => {

    switch (action.type){

        case Actions.orders.updateCurrentOrderSemantics :
            return action.semantics
          
        default:
            return state

    }

}

const pricingReducer = (state,action) => {

    switch (action.type){

        case Actions.orders.calculatePricing :
            return calculatePricing(action.currentOrder,action.modifiers)
        default:
            return state

    }

}

const userReducer = (state,action) => {
    switch (action.type){

        case Actions.user.setSubscriptions :
                return { ...state, subscriptions: action.subscriptions }
        case Actions.user.setAccessToken :
                return { ...state, token: action.token }
        case Actions.user.setSavedLocations :
                return { ...state, savedLocations: action.savedLocations }
        case Actions.user.setDefaultLocation :
                return { ...state, defaultLocation: action.defaultLocation }
        case Actions.user.setRegisteredForNotifications :
                return { ...state, registeredForNotifications: action.registeredForNotifications }
        case Actions.user.setListenForNotifications:
                return { ...state, listenForNotifications: action.listenForNotifications }
        case Actions.user.setNotificationToken:
                console.log(action)
                return { ...state, notificationToken: action.notificationToken }
        case Actions.user.setNotificationTokenUploaded:
                console.log(action)
                return { ...state, notificationTokenUploaded: action.status }
                        
        default:
            return state

    }
}



const reducers = {
    'orderReducer':orderReducer,
    'pricingReducer':pricingReducer,
    'userReducer':userReducer,
    'orderSemanticsReducer':orderSemanticsReducer,
};

export default reducers;