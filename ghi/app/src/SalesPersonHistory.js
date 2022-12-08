function SalesPersonHistory(props) {
    return (
        <>
        <h1>Sales person history</h1>
        <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>phone number</th>
                    <th>sales person</th>
                </tr>
                </thead>
                <tbody>
                {props.sales.map(sales_person => {
                    return (
                    <tr key={sales_person.id}>
                        <td> {sales_person.name }</td>
                        <td> {sales_person.employee_number }</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </>
    );
}

export default SalesPersonHistory;
