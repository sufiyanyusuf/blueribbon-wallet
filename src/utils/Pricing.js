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

        var price = productPrice

        const modifier = modifiers.filter(mod => mod.type === 'Quantity')[0]
        
        if (modifier == null) {
            return price
        }

        const _order = order.filter (order => order.id == modifier.id)[0]

        if (_order && _order.val != null){

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
                    price = (productPrice * modifierPrice)
                    return price
                }
            }
    
        }

        return price

    }

    const multiplyByFrequency = (totalPrice)=>{

        var price = totalPrice
        const modifier = modifiers.filter(mod => mod.type === 'Frequency')[0]

        if (modifier == null){
            return price
        }

        const _order = order.filter (order => order.id == modifier.id)[0]

        if (_order && _order.val != null){

            const selection = _order.val
    
            if (modifier.stepper){
                const modifierPrice = extractPricing(modifier)
                if (modifierPrice != null) {
                    price = (totalPrice * modifierPrice * selection)
                    return price
                }
            }
            else{
                const modifierPrice = extractPricing(modifier)[selection]
                //extract value
                if (modifierPrice != null) {
                    price = (totalPrice * modifierPrice )
                    return price
                }
            }
    
        }

        return price

    }

    const multiplyByLength = (totalPrice)=>{

        var price = totalPrice
        const modifier = modifiers.filter(mod => mod.type === 'Length')[0]

        if (modifier == null){
            return price
        }
        const _order = order.filter (order => order.id == modifier.id)[0]
        
        if (_order && _order.val != null){

            const selection = _order.val
            if (modifier.stepper){
                const modifierPrice = extractPricing(modifier)
                if (modifierPrice != null) {
                    price = (totalPrice * modifierPrice * selection)
                    return price
                }
            }
            else{
                const modifierPrice = extractPricing(modifier)[selection]
                //extract value
                if (modifierPrice != null) {
                    price = (totalPrice * modifierPrice )
                    return price
                }
            }
    
        }

        return price

    }
    
    
    var price = multiplyByQuantity(productPrice)
    price = multiplyByFrequency(price)
    price = multiplyByLength(price)

    return price

}

const extractValue = (modifier) => {

    if (modifier.multiOption && modifier.choice){
        return (
            modifier.choice.map (choice =>{
                return parseFloat(choice.value)
            })
        )
    }

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

    if (modifier.stepper && modifier.stepper.price_multiplier){
        return (modifier.stepper.price_multiplier)
    }

    return 0
}



export default calculatePricing;