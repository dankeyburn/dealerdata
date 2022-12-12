function SalesList(props) {
    return (
        <table className="table table-striped">
                <thead>
                <tr>
                    <th>price</th>
                    <th>vin number</th>
                    <th>customer id</th>
                    <th>customer name</th>
                    <th>sales person</th>
                </tr>
                </thead>
                <tbody>
                {props.sales?.map(sale => {
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
