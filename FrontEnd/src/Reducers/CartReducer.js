const cartReducer = (state=[],action)=>{
    switch(action.type){
        case 'ADDTOCART':
            const dish=action.payload;
            console.log(dish);
            const exist = state.find(item=>item.Dish_Name===dish.Dish_Name)
            if(exist){
                const nextState = state.map((item)=>item.Dish_Name===dish.Dish_Name?{
                    ...exist,quantity:exist.quantity+1
                }:item)
                return nextState;
                
            }
            else{
                const newArray=[...state,{...dish,quantity:1}];
                return newArray;
                
                
            }   
            
        case 'REMOVEFROMCART':
            const removeDish=action.payload;
            console.log(removeDish);
            const removeExist = state.find(item=>item.Dish_Name===removeDish.Dish_Name)
            if(removeExist){
                const removeState = state.map((item)=>(item.Dish_Name===removeDish.Dish_Name && removeDish.quantity>0) ?{
                    ...removeExist,quantity:removeExist.quantity-1
                }:item)
                return removeState;
                
            }
        
        case 'EMPTYCART':
            const emptyArray=action.payload;
            return emptyArray;

            default:
            return state;    

    }

}

export default cartReducer;