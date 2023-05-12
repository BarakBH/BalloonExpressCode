/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import OptionDropdown from "../../components/optionDropdown";
import axios from '../../utils/axios';
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const changeOrderStatus = async (s, id) => {
    toast.loading("מעדכן הזמנה ...");
    try {
      const response = await axios.put('/api/orders?status=' + s + '&id=' + id);
      toast.dismiss();
      toast.success(response.data.message);
      setrefresh(!refresh);
    } catch (error) {
      toast.dismiss();
      if (error.response.data) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      toast.error("בעיה בעדכון הזמנה");
      console.log(error);
    }
  }
  
  const ActionCell = (p) => {
    return (
      <OptionDropdown>
        <ul className="action-options">
          <li onClick={() => changeOrderStatus('מחכה לאישור', p.original._id)}>מחכה לאישור</li>
          <li onClick={() => changeOrderStatus('עובדים על זה', p.original._id)}>עובדים על זה</li>
          <li onClick={() => changeOrderStatus('נשלח', p.original._id)}>נשלח</li>
        </ul>
      </OptionDropdown>
    )
  }
  
  const PriceCell = (p) => {
    return <h3>{p.value}₪</h3>
  }
  
  const StatusCell = (p) => {
    return <span className={`order-status ${p.value}`}>{p.value}</span>
  }
  
  const columns = [
    
    {
      Header: "מוצרים",
      accessor: "products",
      width: 400,
      Cell: (p) => {
        return (
          <div>
            {p.value.map((product, i) => (
              <div key={i}>
                <p>{product.name},</p>
              </div>
            ))}
          </div>
        )
      }
    },
    {
      Header: "שיטת תשלום",
      accessor: "paymentMethod",
    },
    {
      Header: "כתובת למשלוח",
      accessor: "address",
      Cell: (p) => {
        return <span>{p.value?.phone || 'אין כתובת למשלוח'}</span>
      }
    },
    {
      Header: "סכום העסקה",
      accessor: "amount",
      Cell: PriceCell,
    },
    {
      Header: "סטטוס",
      accessor: "status",
      Cell: StatusCell,
    },
    {
      Header: 'שנה סטטוס',
      accessor: 'id',
      Cell: ActionCell,
    }
  
  ];

  useEffect( async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setorders(data);
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
      setrefresh(!refresh);
    }
  },[refresh])
  return (
    <div className="container">
      <div className="page-header">
        <h3 className="page-title">הזמנות</h3>
      </div>
      <div className="data-table products__table">
        <ReactTable
          data={orders}
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

export default Orders;
