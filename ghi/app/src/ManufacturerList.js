import { useState, useEffect } from "react";

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const getData = async () => {
    const resp = await fetch("http://localhost:8100/api/manufacturers/");
    const data = await resp.json();
    setManufacturers(data.manufacturers);
  };

  const handleDelete = async (pk) => {
    const resp = await fetch(`http://localhost:8100/api/manufacturers/${pk}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Manufacturer List</h1>
      <h3>Manufacturers</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {manufacturers?.map((manufacturer) => {
            return (
              <tr className="align-middle" key={manufacturer.id}>
                <td>{manufacturer.name}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(manufacturer.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
