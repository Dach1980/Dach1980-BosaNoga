import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/404';
import CatalogPage from './pages/CatalogPage';
import Main from './pages/Main';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import { restoreCart } from './actions/actionCreators';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        await dispatch(restoreCart());
      } catch (error) {
        console.error("Error restoring cart: ", error);
        // Обработка ошибки, показать уведомление
      }
    };
    loadCart();
  }, [dispatch]); // добавлена зависимость dispatch

  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/catalog/:id' element={<ProductView />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/' element={<Main />} />
            <Route path='*' element={<Navigate to={'/404'} />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;