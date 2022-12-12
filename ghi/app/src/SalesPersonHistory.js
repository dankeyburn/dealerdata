import React from "react";

class SalesPersonHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employee_number: "",
    };
  }

  componentDidMount() {
    const getData = async () => {
      const resp = await fetch("http://localhost:8090/api/sales/");
      const data = await resp.json();
      console.log(data);
      this.setState({
        people: data.results.map((person) => ({
          name: person.name,
          employee_number: person.employee_number,
        })),
      });
    };

    getData();
  }

  handleInputChange = (e) => {
    this.setState({
      filterInput: e.target.value,
    });
  };

  handleFieldChange = (e) => {
    this.setState({
      fieldInput: e.target.value,
    });
  };

  handleApplyFilter = (e) => {};

  render() {
    return (
      <div>
        <h1>People</h1>
        <select onChange={this.handleFieldChange}>
          <option value="name">name</option>
          <option value="employee_id">employee_id</option>
        </select>

        <input
          value={this.state.filterInput}
          onChange={this.handleInputChange}
        />

        {this.state.people
          .filter((person) =>
            person[this.state.fieldInput].includes(this.state.filterInput)
          )
          .map((person) => (
            <>
              <p>
                {person.name} - {person.employee_id}
              </p>
            </>
          ))}
      </div>
    );
  }
}

export default SalesPersonHistory;
