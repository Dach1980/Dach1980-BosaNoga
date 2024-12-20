// import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSelector } from "../selectors";
import { setCartItems } from "../actions/actionCreators";


const OrderTable = () => {
    const { items } = useSelector(cartItemsSelector);
    const dispatch = useDispatch();
    console.log('OrderTable -items ', items)

    const handleDelete = (id, size) => {
        const newItems = items.filter((item) => !(item.id === id && item.size === size))

        dispatch(setCartItems(newItems));
    }

    const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

    return (
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {[
                            '#',
                            'Название',
                            'Размер',
                            'Кол-во',
                            'Стоимость',
                            'Итого',
                            'Действия',
                        ].map((columnHeader) => (
                            <th key={columnHeader} scope="col">
                                {columnHeader}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={item.id + item.size}>
                            <th scope="row">{i + 1}</th>
                            <td>
                                <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                            </td>
                            <td>{item.size}</td>
                            <td>{item.count}</td>
                            <td>{item.price} руб.</td>
                            <td>{item.total} руб.</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(item.id, item.size)}
                                    type="button"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5" className="text-right">
                            Общая стоимость
                        </td>
                        <td>{totalAmount} руб.</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default OrderTable;