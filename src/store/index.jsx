import { configureStore } from '@reduxjs/toolkit';
import productsListReducer from '../reducers/productsList';
import categoriesListReducer from '../reducers/categoriesList';
import cartItemsReducer from '../reducers/cartItems';
import cartFormReducer from '../reducers/cartForm';
import productReducer from '../reducers/product';
import bestsellersListReducer from '../reducers/bestsellersList';

// Создание хранилища с помощью configureStore
const store = configureStore({
    reducer: {
        productsList: productsListReducer,
        categoriesList: categoriesListReducer,
        bestsellersList: bestsellersListReducer,
        cartItems: cartItemsReducer,
        cartForm: cartFormReducer,
        product: productReducer,
    },
})


console.log('Это index - store:', store);

export default store;
