export const openModal = ()=>{
    return{
        type:'OPEN'
    }
}
export const closeModal = ()=>{
    return{
        type:'CLOSE'
    }
}

export const addToCart = (dish)=>{
    return{
        type:'ADDTOCART',
        payload:dish
    }
}

export const removeFromCart = (dish)=>{
    return{
        type:'REMOVEFROMCART',
        payload:dish
    }
}

export const emptyCart = (emptyArray)=>{
    return{
        type:'EMPTYCART',
        payload:emptyArray
    }
}