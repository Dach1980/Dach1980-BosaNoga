import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS_FIRST,
    FETCH_PRODUCTS_SUCCESS_MORE,
    CLEAR_PRODUCTS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    SET_LOADING_FALSE,
    SET_CATEGORY_ID,
    SET_SEARCH_STRING,
    REPLACE_CART_ITEMS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_ERROR,
    CHANGE_FORM_INPUT,
    CLEAR_FORM,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_SUCCESS,
    FETCH_BESTSELLERS_REQUEST,
    FETCH_BESTSELLERS_FAILURE,
    FETCH_BESTSELLERS_SUCCESS,
} from './actionTypes';

const baseUrl = 'http://localhost:7070/api/';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: {
        error,
    },
});

export const fetchProductsSuccessFirst = (items) => ({
    type: FETCH_PRODUCTS_SUCCESS_FIRST,
    payload: {
        items,
    },
});

export const fetchProductsSuccessMore = (items) => ({
    type: FETCH_PRODUCTS_SUCCESS_MORE,
    payload: {
        moreItems: items,
    },
});

export const clearProducts = () => ({
    type: CLEAR_PRODUCTS,
// });fetchProducts 
});

export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
        error,
    },
});

export const fetchCategoriesSuccess = (data) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: { categories: data },
});


export const setProductsLoadingFalse = () => ({
    type: SET_LOADING_FALSE,
});

export const setCategoryId = (id) => ({
    type: SET_CATEGORY_ID,
    payload: {
        categoryId: id,
    },
});

export const setSearchValue = (query) => ({
    type: SET_SEARCH_STRING,
    payload: {
        query,
    },
});

export const replaceCartItems = (items) => ({
    type: REPLACE_CART_ITEMS,
    payload: {
        items,
    },
});

export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST,
});

export const fetchProductFailure = (error) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: {
        error,
    },
});

export const fetchProductSuccess = (product) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: {
        product,
    },
});

export const fetchBestsellersRequest = () => ({
    type: FETCH_BESTSELLERS_REQUEST,
});

export const fetchBestsellersFailure = (error) => ({
    type: FETCH_BESTSELLERS_FAILURE,
    payload: {
        error,
    },
});

export const fetchBestsellersSuccess = (items) => ({
    type: FETCH_BESTSELLERS_SUCCESS,
    payload: {
        items,
    },
});

export const sendOrderRequest = () => ({
    type: SEND_ORDER_REQUEST,
});

export const sendOrderSuccess = () => ({
    type: SEND_ORDER_SUCCESS,
});

export const sendOrderError = (error) => ({
    type: SEND_ORDER_ERROR,
    payload: {
        error,
    },
});

export const changeFormInput = (name, value) => ({
    type: CHANGE_FORM_INPUT,
    payload: { name, value },
});

export const clearForm = () => ({
    type: CLEAR_FORM,
});

export const setCartItems = (items) => (dispatch) => {
    dispatch(replaceCartItems(items));
    localStorage.setItem('cart', JSON.stringify(items));
};

export const sendOrder = (items, form) => (dispatch) => {
    dispatch(sendOrderRequest());

    const orderData = items.map((item) => ({ id: item.id, price: item.price, count: item.count }));
    fetch(`${baseUrl}order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner: {
                phone: form.phone,
                address: form.address,
            },
            items: orderData,
        }),
    })
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                dispatch(clearForm());
                dispatch(setCartItems([]));
                dispatch(sendOrderSuccess());
            }
        })
        .catch((error) => dispatch(sendOrderError(error)));
};

export const restoreCart = () => (dispatch) => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
        dispatch(replaceCartItems(items));
    }
};

export const fetchProducts = (offset) => async (dispatch, getState) => {
    const { productsList: { query }, categoriesList: { categoryId } } = getState();
    dispatch(fetchProductsRequest());

    if (!offset) {
        dispatch(clearProducts());
    }

// Создаем объект URLSearchParams на основе параметров
    const params = new URLSearchParams({ offset, categoryId, q: query }).toString();
    const fetchUrl = `${baseUrl}items?${params}`;

    try {
        const response = await fetch(fetchUrl, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (offset === 0) {
            dispatch(fetchProductsSuccessFirst(data));
        }
        if (offset > 0) {
            dispatch(fetchProductsSuccessMore(data));
        }
    } catch (error) {
        dispatch(fetchProductsFailure(error.message));
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesRequest());

    try {
        const response = await fetch(`${baseUrl}categories`);

        const data = await response.json();
        dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message));
    }
};

export const fetchProduct = (navigate, id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    try {
        const response = await fetch(`${baseUrl}items/${id}`);
        
        if (response.status === 404) {
            navigate('/404');
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch(fetchProductFailure(error.message));
    }
};

export const searchProducts = (query) => (dispatch) => {
    dispatch(setSearchValue(query));
    dispatch(fetchProducts(0));
};

export const fetchProductsAndCategories = () => (dispatch) => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(0));
};

export const fetchProductsOnly = () => (dispatch) => {
    dispatch(fetchProducts(0));
};

export const fetchBestsellers = () => async (dispatch) => {
    dispatch({ type: FETCH_BESTSELLERS_REQUEST });

    try {
        const response = await fetch(`${baseUrl}top-sales/`);

        if (!response.ok) {
            throw new Error('Failed to fetch bestsellers');
        }

        const data = await response.json();
        dispatch({ type: FETCH_BESTSELLERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_BESTSELLERS_FAILURE, payload: error.message });
    }
};
