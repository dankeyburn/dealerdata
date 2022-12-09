function SalesList(props) {
    return (
        <table className="table table-striped">
                <thead>
                <tr>
                    <th>Price</th>
                    <th>Vin Number</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
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

                        <td>{ sale.sales_person.name }</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
    );
}

export default SalesList;
