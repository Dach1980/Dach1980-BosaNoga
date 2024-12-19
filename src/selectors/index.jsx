import { createSelector } from 'reselect';

const selectProductsState = (state) => state.productsList;

export const productsListSelector = createSelector(
    [selectProductsState],
    (productsList) => ({
        items: productsList.items,
        loading: productsList.loading,
        error: productsList.error,
    })
);

const selectCategoriesState = (state) => state.categoriesList;

export const categoriesListSelector = createSelector(
    [selectCategoriesState],
    (categoriesList) => ({
        items: categoriesList.items,
        loading: categoriesList.loading,
    })
);

/*
export const categoriesListSelector = (state) => state.categoriesList;

export const productsListSelector = (state) => ({
    items: state.productsList.items || [],
    loading: state.productsList.loading,
    error: state.productsList.error
});
*/
export const bestsellersListSelector = (state) => state.bestsellersList;
export const cartItemsSelector = (state) => state.cartItems;
export const cartFormSelector = (state) => state.cartForm;
export const productSelector = (state) => state.product;