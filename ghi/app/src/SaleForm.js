import React from 'react';

class SaleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sales_person: [],
        automobile: '',
        customer: [],
        price: '',
        hasSignedUp: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSalesPerson = this.handleChangeSalesPerson.bind(this);
    this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ sales: data.sales });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.sales;
    delete data.hasSignedUp;

    const saleUrl = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const saleResponse = await fetch(saleUrl, fetchOptions);
    if (saleResponse.ok) {
      this.setState({
        sales_person: '',
        automobile: '',
        customer: '',
        price: '',
        hasSignedUp: true,
      });
    }
  }

  handleChangeSalesPerson(event) {
    const value = event.target.value;
    this.setState({ sales_person: value });
  }

  handleChangeAutomobile(event) {
    const value = event.target.value;
    this.setState({ automobile: value });
  }

  handleChangeCustomer(event) {
    const value = event.target.value;
    this.setState({ customer: value });
  }

  handleChangePrice(event) {
    const value = event.target.value;
    this.setState({ price: value });
  }

  render() {

    let dropdownClasses = 'form-select d-none';
    if (this.state.sales_persons?.length > 0) {
      dropdownClasses = 'form-select';
    }

    if (this.state.customers?.length > 0) {
      dropdownClasses = 'form-select';
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (this.state.hasSignedUp) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
      <div className="my-5 container">
        <div className="row">
          <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form className={formClasses} onSubmit={this.handleSubmit} id="create-attendee-form">
                  <h1 className="card-title">It's Sale Time!</h1>
                  <p className="mb-3">
                    Please choose which car
                    you'd like to have.
                  </p>
                  <div className="mb-3">
                    <select onChange={this.handleChangeSalesPerson} name="sales_person" id="sales_person" className={dropdownClasses} required>
                      <option value="">Choose a sales person</option>
                      {this.state.sales_persons?.map(sales_person => {
                        return (
                          <option key={sales_person.href} value={sales_person.href}>{sales_person.name}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <select onChange={this.handleChangeCustomer} name="customer" id="customer" className={dropdownClasses} required>
                      <option value="">Choose a customer</option>
                      {this.state.customers?.map(customer => {
                        return (
                          <option key={customer.href} value={customer.href}>{customer.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <p className="mb-3">
                    Now, tell us about yourself.
                  </p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={this.handleChangeAutomobile} required placeholder="automobile" type="text" id="automobile" name="automobile" className="form-control" />
                        <label htmlFor="name">automobile</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={this.handleChangePrice} required placeholder="price" type="price" id="price" name="price" className="form-control" />
                        <label htmlFor="price">Your price</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">SOLD!</button>
                </form>
                <div className={messageClasses} id="success-message">
                  Congratulations! You're all signed up!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaleForm;
