import React from "react";
import Loader from "./Loader";
import Message from "./Message";
import ProductTable from "./ProductTable";
import {
    fetchProduct,
} from "../actions/actionCreators.js";
import {useNavigate} from "react-router-dom";

const Product = ({
    loading,
    error,
    isProduct,
    product,
    availableSizes,
    selectedSize,
    setSelectedSize,
    changeQuantity,
    selectedQuantity,
    addToCart,
    id
}) => {
    const navigate = useNavigate()
    if (loading) {
        return <Loader loading />;
    }

    if (error) {
        return <Message type="error" message={error} callback={fetchProduct} productId={id} navigate={navigate} />;
    }

    if (!isProduct) {
        return null;
    }

    return (
        <section className="catalog-item">
            <h2 className="text-center">{product.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={product.images[0]} className="img-fluid" alt={product.title} />
                </div>
                <div className="col-7">
                    <ProductTable product={product} />
                    {availableSizes.length ? (
                        <div>
                            <div className="text-center">
                                <p>
                                    Размеры в наличии:
                                    {availableSizes.map((size) => (
                                        <React.Fragment key={size.size}>
                                            &nbsp;
                                            <span
                                                className={`catalog-item-size ${selectedSize === size.size ? 'selected' : ''}`}
                                                onClick={() => setSelectedSize(size.size)}
                                                role="radio"
                                                tabIndex={0}
                                                aria-checked={false}
                                            >
                                                {size.size}
                                            </span>
                                        </React.Fragment>
                                    ))}
                                </p>
                                <p>
                                    Количество:
                                    <span className="btn-group btn-group-sm pl-2">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-type="decrease"
                                            onClick={changeQuantity}
                                            disabled={selectedQuantity < 2}
                                        >
                                            -
                                        </button>
                                        <span className="btn btn-outline-primary">
                                            {selectedQuantity}
                                        </span>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-type="increase"
                                            onClick={changeQuantity}
                                            disabled={selectedQuantity > 9}
                                        >
                                            +
                                        </button>
                                    </span>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-danger btn-block btn-lg"
                                disabled={!selectedSize}
                                onClick={addToCart}
                            >
                                В корзину
                            </button>
                        </div>
                    ) : (
                        <p>Нет в наличии</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Product;
