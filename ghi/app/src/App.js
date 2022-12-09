import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList';
import SaleForm from './SaleForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';

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
      </Routes>
    </div>
    </BrowserRouter>
    <div className='container'>
      <SalesList sales={props.sales} />
      <SaleForm />
      <SalesPersonHistory sales={props.sales}/>
      <SalesPersonForm />
      <CustomerForm />
    </div>
    </>
  );
}

export default App;
