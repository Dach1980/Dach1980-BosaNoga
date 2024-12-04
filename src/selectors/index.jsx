export const categoriesListSelector = (state) => state.categoriesList;
export const productsListSelector = (state) => ({
    items: state.productsList.items || [],
    loading: state.productsList.loading,
    error: state.productsList.error
});
export const bestsellersListSelector = (state) => state.bestsellersList;
export const cartItemsSelector = (state) => state.cartItems;
export const cartFormSelector = (state) => state.cartForm;
export const productSelector = (state) => state.product;