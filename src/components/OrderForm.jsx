import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeFormInput, sendOrder} from "../actions/actionCreators";
import { cartFormSelector, cartItemsSelector } from "../selectors";
import Loader from "./Loader";
import Message from "./Message";


const OrderForm = () => {
  const { items } = useSelector(cartItemsSelector);
  const { form, loading, error, success } = useSelector(cartFormSelector);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id: name, value } = event.currentTarget;

    if (name === "agreement") {
      dispatch(changeFormInput(name, !form.agreement));
      return;
    }

    dispatch(changeFormInput(name, value));
  }

  const sendBtnDisabled = !(form.phone && form.address && form.agreement && items.length);
  const successMessage = success ? "Ваш заказ отправлен" : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendOrder(items, form));
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={form.agreement}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={sendBtnDisabled}
          >
            Оформить
          </button>
        </form>
        <Loader loading={loading} />
        <Message type="error" message={error} />
        <Message type="success" message={successMessage} />
      </div>
    </section>
  )
}

export default OrderForm;
