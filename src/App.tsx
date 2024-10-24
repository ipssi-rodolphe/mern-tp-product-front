import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./layouts/Wrapper";
// import ProductList from './components/ProductList';
// import AddProduct from './components/AddProduct';
// import Home from './pages/Home';
// import UpdateProduct from './components/UpdateProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          {/* <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} /> */}
          {/* <Route path="add-product" element={<AddProduct />} />
          <Route path="edit/:id" element={<UpdateProduct />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
