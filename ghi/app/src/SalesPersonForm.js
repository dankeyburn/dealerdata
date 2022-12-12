import React from "react";

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employee_number: "",
      hasSignedUp: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmployeeNumber =
      this.handleChangeEmployeeNumber.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8090/api/salespersons/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ sales_persons: data.sales_persons });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.sales_persons;
    delete data.hasSignedUp;

    const sales_person_Url = "http://localhost:8090/api/salespersons/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const sales_person_Response = await fetch(sales_person_Url, fetchOptions);
    if (sales_person_Response.ok) {
      this.setState({
        name: "",
        employee_number: "",
        hasSignedUp: true,
      });
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeEmployeeNumber(event) {
    const value = event.target.value;
    this.setState({ employee_number: value });
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
                  id="create-sales-person-form"
                >
                  <h1 className="card-title">add new sales person here:</h1>
                  <p className="mb-3">welcome, new sales person.</p>

                  <p className="mb-3">input name and unique id:</p>
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
                        <label htmlFor="name">full name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleChangeEmployeeNumber}
                          required
                          placeholder="Your employee id"
                          type="employee_id"
                          id="employee_id"
                          name="employee_id"
                          className="form-control"
                        />
                        <label htmlFor="email">employee id</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">submit</button>
                </form>
                <div className={messageClasses} id="success-message">
                  congratulations! the new sales person is in the system!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesPersonForm;
