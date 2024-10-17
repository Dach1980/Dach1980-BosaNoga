import React from "react";

const ProductTable = ({ product }) => (
    <table className="table table-bordered">
        <tbody>
            <tr>
                <td>Артикул</td>
                <td>{product.sku || null}</td>
            </tr>
            <tr>
                <td>Производитель</td>
                <td>{product.manufacturer || null}</td>
            </tr>
            <tr>
                <td>Цвет</td>
                <td>{product.color || null}</td>
            </tr>
            <tr>
                <td>Материалы</td>
                <td>{product.material || null}</td>
            </tr>
            <tr>
                <td>Сезон</td>
                <td>{product.season || null}</td>
            </tr>
            <tr>
                <td>Повод</td>
                <td>{product.reason || null}</td>
            </tr>
        </tbody>
    </table>
);

export default ProductTable;