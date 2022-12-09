import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList';
import SaleForm from './SaleForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';

function App(props) {
  if (props.sales === undefined) {
    return null;
  }
  return (
    <>
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales/" element={<SalesList sales={props.sales} />} />
          <Route path="/sales/new/" element={<SaleForm />} />
          <Route path="/salesperson/new/" element={<SalesPersonForm />} />
          <Route path="/customer/new" element={<CustomerForm />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/manufacturers/" element={<ManufacturerList />} />
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
