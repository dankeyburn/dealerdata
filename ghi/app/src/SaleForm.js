import React from 'react';

class SaleForm extends React.Component {
  render() {
    return (
      <div class="row">
      <div class="offset-3 col-6">
        <div class="shadow p-4 mt-4">
          <h1>create a new sale record</h1>
          <form id="create-sale-form">
            <div class="form-floating mb-3">
              <input placeholder="Automobile" required type="text" name="automobile" id="automobile" class="form-control" />
              <label for="automobile">Automobile</label>
            </div>
            <div class="mb-3">
              <select required name="sales_person" id="sales_person" class="form-select">
                <option selected value="">choose a sales person</option>
              </select>
            </div>
            <div class="mb-3">
              <select required name="customer" id="customer" class="form-select">
                <option selected value="">choose a customer</option>
              </select>
            </div>
            <div class="form-floating mb-3">
              <input placeholder="price" required type="text" name="price" id="price" class="form-control" />
              <label for="price">Price</label>
            </div>
            <button class="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default SaleForm;
