import modalReducer from './ModalReducer';
import { combineReducers } from 'redux';
import cartReducer from './CartReducer';

const allReducers = combineReducers({
    modalReducer:modalReducer,
    cartReducer:cartReducer
})

export default allReducers;