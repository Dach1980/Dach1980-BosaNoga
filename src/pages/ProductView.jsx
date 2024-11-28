import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, fetchProduct } from "../actions/actionCreators";
import { cartItemsSelector, productSelector } from "../selectors";
import Product from "../components/Product";

const ProductView = () => {
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector(cartItemsSelector);
    const { product, loading, error } = useSelector(productSelector);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const changeQuantity = (event) => {
        const { type } = event.target.dataset;
        setSelectedQuantity((prevQuantity) => {
            if (type === 'increase') {
                return prevQuantity + 1;
            }
            return prevQuantity - 1;
        })
    }

    const addToCart = () => {
        const foundItem = items.find((item) => item.id === product.id && item.size === selectedSize);
        let newItems = [...items.map((item) => ({ ...item }))];
        let newItem;

        if (!foundItem) {
            newItem = {
                id: product.id,
                title: product.title,
                size: selectedSize,
                price: product.price,
                total: product.price * selectedQuantity,
                count: selectedQuantity,
            };
        }

        if (foundItem) {
            newItem = {
                ...foundItem,
                count: foundItem.count + selectedQuantity,
                price: product.price,
                total: foundItem.total + product.price * selectedQuantity,
            };

            newItems = items.filter((item) => !(item.id === product.id && item.size === selectedSize));
        }

        newItems = [...newItems, newItem];
        dispatch(setCartItems(newItems));
        navigate('/cart');
    }

    useEffect(() => {
        dispatch(fetchProduct(navigate, id))
    }, [id, dispatch, navigate]);

    const isProduct = Boolean(Object.keys(product).length);
    const availableSizes = isProduct ? product.sizes.filter((size) => size.available) : null;
    return (
        <Product
            loading={loading}
            error={error}
            isProduct={isProduct}
            product={product}
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            changeQuantity={changeQuantity}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            addToCart={addToCart}
            id={Number(id)}
        />
    );
}

export default ProductView;