const calculatePricing = (order,modifiers) => {
   
    var totalPrice = 0.00
    // calculate product unit pricing
    // calculate quantity pricing
    // calculate subscription pricing
    totalPrice = totalPrice + getProductPricing(order,modifiers)
    
    return totalPrice
}

const getProductPricing = (order,modifiers) => {
    const productModifiers = modifiers.filter(mod => mod.type === 'Product')
    var price = 0

    productModifiers.map (modifier => {
        const _order = order.filter (order => order.id == modifier.id)[0]

        if (_order && _order.val != null){
            //
            const selectionIndex = _order.val
            const modifierPrice = extractPricing(modifier)[selectionIndex]
            if (modifierPrice != null) {
                price = (price + modifierPrice)
            }
            
        }
       
    })
    return price

}

const getSubscriptionPricing = (order,modifiers) => {
    return 0
}

const getSchedulePricing = (order,modifiers) => {
    return 0
}

const extractPricing = (modifier) => {
    if (modifier.multiOption && modifier.choice){
        return (
            modifier.choice.map (choice =>{
                return parseFloat(choice.pricing_impact)
            })
        )
    }
    return 0
}
export default calculatePricing;