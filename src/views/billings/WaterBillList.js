import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//import { DocsExample } from 'src/components'

function WaterBillList() {
  /*const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setListOfUsers(response.data);
      console.log(response.data);
    });
  }, []);*/
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Invoice #</TableCell>
            <TableCell align="center">Unit #</TableCell>
            <TableCell align="center">Billpayer</TableCell>
            <TableCell align="center">Billing Cost</TableCell>
            <TableCell align="center">Contact #</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        {/*<TableBody>
          {listOfUsers.map((value, index) => (
            <TableRow key={index}>
              <TableCell align="center">{value.email}</TableCell>
              <TableCell align="center">{value.unit_no}</TableCell>
              <TableCell align="center">{value.first_name}</TableCell>
              <TableCell align="center">{value.last_name}</TableCell>
              <TableCell align="center">{value.contact_no}</TableCell>
              <TableCell align="center">{value.role}</TableCell>
              <TableCell align="center">{value.status}</TableCell>
              <TableCell align="center">
                <button>Edit</button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>*/}
      </Table>
    </TableContainer>
  );
}

export default WaterBillList;
