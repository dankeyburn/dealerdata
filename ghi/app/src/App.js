import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

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
    <div>
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Price</th>
            <th>Vin Number</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>address</th>
            <th>phone number</th>
            <th>sales person</th>
          </tr>
        </thead>
        <tbody>
          {props.sales.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{ sale.price }</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.customer.id }</td>
                <td>{ sale.customer.name }</td>
                <td>{ sale.customer.address }</td>
                <td>{ sale.customer.phone_number }</td>
                <td>{ sale.sales_person }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;
