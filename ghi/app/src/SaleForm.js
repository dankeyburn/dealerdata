import React from 'react';

class SalesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            sales_person: '',
            customer: '',
            automobile: '',
            customers: [],
            sales_persons: [],
            automobiles: []
        };
        this.handleChangeSalesPerson = this.handleChangeSalesPerson.bind(this);
        this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this);
        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_persons = data.salesPersons;
        delete data.automobiles;
        delete data.sales_persons;
        delete data.customers;
        console.log(data);

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
          const newSale = await response.json();
          const cleared = {
            price: '',
            automobile: '',
            customer: '',
            sales_person: '',
          };
          this.setState(cleared);
        }
      }
    handleChangePrice(event) {
        const value = event.target.value;
        this.setState({price: value})
    }
    handleChangeAutomobile(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }
    handleChangeCustomer(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }
    handleChangeSalesPerson(event) {
        const value = event.target.value;
        this.setState({sales_person: value})
    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const customerUrl = 'http://localhost:8090/api/customers/';
        const salesPersonUrl = 'http://localhost:8090/api/salespersons/';
        const autoResponse = await fetch(autoUrl);
        const customerResponse = await fetch(customerUrl);
        const salesPersonResponse = await fetch(salesPersonUrl);
        if (autoResponse.ok) {
          const data = await autoResponse.json();
            this.setState({automobiles: data.autos})
            console.log(data)
         }
        if (customerResponse.ok) {
        const data = await customerResponse.json();
            this.setState({customers: data.customers})
        }
        if (salesPersonResponse.ok) {
        const data = await salesPersonResponse.json();
            this.setState({sales_persons: data.sales_persons})
            console.log(data)
        }
        }

    render() {
        return (

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePrice} placeholder="price" required type="number" name="price" id="price" className="form-control" value={this.state.price}/>
                <label htmlFor="price">Price</label>
                </div>
                <select onChange={this.handleChangeAutomobile} required id="automobile" name= "automobile" className="form-select" value={this.state.automobile}>
                  <option value="">Choose an automobile</option>
                  {this.state.automobiles.map(automobile => {
                    return (
                    <option key={automobile.id} value={automobile.vin}>
                        {automobile.vin}
                    </option>
                    );
                  })}
                </select>
                <select onChange={this.handleChangeSalesPerson} required id="sales_person" name= "sales_person" className="form-select" value={this.state.sales_person}>
                  <option value="">Choose a sales person</option>
                  {this.state.sales_persons.map(salesPerson => {
                    return (
                    <option key={salesPerson.id} value={salesPerson.employee_number}>
                        {salesPerson.name}
                    </option>
                    );
                  })}
                </select>
                <select onChange={this.handleChangeCustomer} required id="customer" name= "customer" className="form-select" value={this.state.customer}>
                  <option value="">Choose a customer</option>
                  {this.state.customers.map(customer => {
                    return (
                    <option key={customer.name} value={customer.name}>
                        {customer.name}
                    </option>
                    );
                  })}
                </select>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

        );
    }
}

export default SalesForm
