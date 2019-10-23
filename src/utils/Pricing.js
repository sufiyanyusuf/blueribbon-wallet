const calculatePricing = (order,modifiers) => {
   
    var totalPrice = 0.00
    // calculate product unit pricing
    // calculate quantity pricing
    // calculate subscription pricing
    totalPrice = getSubscriptionPricing (getProductPricing(order,modifiers),order,modifiers)
    return totalPrice
}

const getProductPricing = (order,modifiers) => {
    // get mods related to product

    const productModifiers = modifiers.filter(mod => mod.type === 'Product')
    var price = 0

    
    productModifiers.map (modifier => {

        // get order from modifier
        const _order = order.filter (order => order.id == modifier.id)[0]

        if (_order && _order.val != null){

            const selection = _order.val
            
            if (modifier.stepper){
                const modifierPrice = extractPricing(modifier)
                if (modifierPrice != null) {
                    price = (price + modifierPrice*selection)
                }
            }
            else{
                const modifierPrice = extractPricing(modifier)[selection]
                if (modifierPrice != null) {
                    price = (price + modifierPrice)
                }
            }

            
        }
       
    })

    return price

}

const getSubscriptionPricing = (productPrice = 0, order, modifiers) => {
    //qty,freq,len

    const multiplyByQuantity = (productPrice)=>{

        const modifier = modifiers.filter(mod => mod.type === 'Quantity')[0]
    
        const _order = order.filter (order => order.id == modifier.id)[0]

        if (_order && _order.val != null){

            var price = 0
            const selection = _order.val
    
            if (modifier.stepper){
                const modifierPrice = extractPricing(modifier)
                if (modifierPrice != null) {
                    price = (productPrice * modifierPrice * selection)
                    return price
                }
            }
            else{
                const modifierPrice = extractPricing(modifier)[selection]
                if (modifierPrice != null) {
                    price = (productPrice * modifierPrice * modifier.value)
                    return price
                }
            }

            return price
    
        }

    }

    
    
    const price = multiplyByQuantity(productPrice)

    return price

}



const extractPricing = (modifier) => {

    if (modifier.multiOption && modifier.choice){
        return (
            modifier.choice.map (choice =>{
                return parseFloat(choice.pricing_impact)
            })
        )
    }

    if (modifier.stepper && modifier.stepper.price_multiplier){
        return (modifier.stepper.price_multiplier)
    }

    return 0
}

export default calculatePricing;