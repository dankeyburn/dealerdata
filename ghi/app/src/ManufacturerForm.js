import React from "react";

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hasSignedUp: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.manufacturers;
    delete data.hasSignedUp;

    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const manufacturer_Response = await fetch(manufacturerUrl, fetchOptions);
    if (manufacturer_Response.ok) {
      this.setState({
        name: "",
        hasSignedUp: true,
      });
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
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
                  <h1 className="card-title">It's a New Manufacturer!</h1>
                  <p className="mb-3">Welcome, new Manufacturer!.</p>

                  <p className="mb-3">Now, tell us about yourself.</p>
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
                        <label htmlFor="name">Your full name</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">
                    I'm going to be a customer!
                  </button>
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

export default ManufacturerForm;
