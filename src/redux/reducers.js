import Actions from './action';

const orderReducer = (state,action) => {
    
    var order = Object.assign({},state);

    switch (action.type){
        case Actions.orders.updateCurrentOrder :
            //remove existing id from state
            const _state = state.filter (order => order.id != action.order.id)
            return (_state.concat([action.order]))
        default:
            return state
    }

}

const reducers = {
    'orderReducer':orderReducer
};

export default reducers;