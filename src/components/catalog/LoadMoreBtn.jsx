import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsListSelector } from "../../selectors";
import { fetchProducts } from "../../actions/actionCreators";

const LoadMoreBtn = ({ items }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(productsListSelector);
  const [countItems, setCountItems] = useState('');
  const [prevCount, setPrevCount] = useState(1);
  const showBtn = !loading && (items.length % 6 === 0) && (countItems !== prevCount) && countItems;

  useEffect(() => {
    setCountItems(items.length);
    setPrevCount('');
  }, [items.length]);

  const handleLoadMore = () => {
    dispatch(fetchProducts(items.length));
    setPrevCount(countItems);
    setCountItems(items.length);
  }

  if (!showBtn) {
    return null;
  }

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={handleLoadMore} type="button">
        Загрузить ещё
      </button>
    </div>
  )
}

export default LoadMoreBtn;
