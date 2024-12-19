import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsListSelector } from "../../selectors";
import { fetchProducts } from "../../actions/actionCreators";
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ items }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(productsListSelector);
  const [countItems, setCountItems] = useState('');
  const [prevCount, setPrevCount] = useState(1);
  const showBtn = !loading && (items.length % 6 === 0) && (countItems !== prevCount) && countItems;

  console.log('items:', items);

  useEffect(() => {
    setCountItems(items.length);
    setPrevCount('');
  }, [items.length]);

  const handleLoadMore = async () => {
    try {
      await dispatch(fetchProducts(items.length));
      setPrevCount(countItems);
      setCountItems(items.length);
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    }
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

// Валидация пропсов
LoadMoreBtn.propTypes = {
  items: PropTypes.array.isRequired, // Указываем, что items — это обязательный массив
};

export default LoadMoreBtn;
