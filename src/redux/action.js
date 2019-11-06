const actions = {
    orders:{
        updateCurrentOrder:'UPDATE_CURRENT_ORDER',
        updateCurrentOrderSemantics:'UPDATE_CURRENT_ORDER_SEMANTICS',
        calculatePricing:'CALCULATE_PRICING',
        checkLocationEligibility:'CHECK_LOCATION_ELIGIBILITY'
    },
    user:{
        setAccessToken:'SET_ACCESS_TOKEN',
        setSavedLocations:'SET_SAVED_LOCATIONS',
        setSubscriptions:'SET_SUBSCRIPTIONS',
        setDefaultLocation:'SET_DEFAULT_LOCATION',
    }
}
export default actions;