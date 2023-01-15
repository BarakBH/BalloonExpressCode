/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import axios from '../../utils/axios';

const Customers = () => {
  const [customers, setcustomers] = useState([])

  const AmountCell = (e) => {
    return (
      <div>
        {e.value || 0}₪
      </div>
    )
  }

  const columns = [
  
    {
      Header: "שם",
      accessor: "name",
    },
    {
      Header: "אימייל",
      accessor: "email",
    },
    {
      Header: "כמות שצרכו",
      accessor: "amount",
      Cell: AmountCell,
    },
    {
      Header: '	תאריך הצטרפות',
      accessor: 'createdAt',
    }
  
  ];

  useEffect( async () => {
    try {
      const { data } = await axios.get('/api/customers');
      setcustomers(data)
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
    <div className="container">
      <div className="page-header">
        <h3 className="page-title">לקוחות</h3>
      </div>
      <div className="data-table customers__table">
        <ReactTable
          data={customers}
          columns={columns}
          minRows={0}
          defaultPageSize={15}
          showPageJump={true}
          previousText={""}
          nextText={""}
          resizable={false}
        />
      </div>
    </div>
  );
};

export default Customers;
