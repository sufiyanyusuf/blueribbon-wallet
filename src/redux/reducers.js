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

const pricingReducer = (state,action) => {

    switch (action.type){

        case Actions.orders.calculatePricing :
            return calculatePricing(action.currentOrder,action.modifiers)
        default:
            return state

    }

}

const reducers = {
    'orderReducer':orderReducer,
    'pricingReducer':pricingReducer
};

export default reducers;