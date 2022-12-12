import React from "react";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone_number: "",
      hasSignedUp: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ customers: data.customers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.customers;
    delete data.hasSignedUp;

    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const customer_Response = await fetch(customerUrl, fetchOptions);
    if (customer_Response.ok) {
      this.setState({
        name: "",
        address: "",
        phone_number: "",
        hasSignedUp: true,
      });
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeAddress(event) {
    const value = event.target.value;
    this.setState({ address: value });
  }

  handleChangePhoneNumber(event) {
    const value = event.target.value;
    this.setState({ phone_number: value });
  }

  render() {
    let messageClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    if (this.state.hasSignedUp) {
      messageClasses = "alert alert-success mb-0";
      formClasses = "d-none";
    }

    return (
      <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form
                  className={formClasses}
                  onSubmit={this.handleSubmit}
                  id="create-customer-form"
                >
                  <h1 className="card-title">it's new customer time!</h1>
                  <p className="mb-3">welcome, new potential customer.</p>

                  <p className="mb-3">now, tell us about yourself.</p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleChangeName}
                          required
                          placeholder="Your full name"
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                        />
                        <label htmlFor="name">your full name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleChangeAddress}
                          required
                          placeholder="Your address"
                          type="address"
                          id="address"
                          name="address"
                          className="form-control"
                        />
                        <label htmlFor="address">your address</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleChangePhoneNumber}
                          required
                          placeholder="Your phone number"
                          type="pone_number"
                          id="phone_number"
                          name="phone_number"
                          className="form-control"
                        />
                        <label htmlFor="address">your phone number</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">
                    i'm going to be a customer!
                  </button>
                </form>
                <div className={messageClasses} id="success-message">
                  congratulations! you're all signed up!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
