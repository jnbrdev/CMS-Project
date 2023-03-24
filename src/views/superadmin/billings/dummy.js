<table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Bill to</th>
                        <th>Unit Size</th>
                        <th>Rate</th>
                        <th>Penalty</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formData.invoiceAssocBillTo}</td>
                        <td>{formData.unit_size}</td>
                        <td>{formData.ratePerSqm}</td>
                        <td>{formData.penalty}</td>
                        <td>{formData.assocDueTotal}</td>
                    </tr>
                </tbody>
              </table>