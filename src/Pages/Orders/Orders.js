import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  //   console.log(user?.email);
  //   const url = `http://localhost:5000/orders?email=${user.email}`;

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);

  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure to delete this order?");
    if (proceed) {
      fetch(`http://localhost:5000/orders/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Successfully deleted order");
            const remaining = orders.filter((ord) => ord._id !== _id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const approving = orders.find((ord) => ord._id === id);
          const remaining = orders.filter((odr) => odr._id !== id);
          approving.status = "Approved";
          const newOrder = [...remaining, approving];
          setOrders(newOrder);
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl text-center my-4 rounded-lg">You have {orders.length} Orders</h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/*  <!-- head --> */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>
            ))}
          </tbody>
          {/* row 4 */}
        </table>
      </div>
    </div>
  );
};

export default Orders;
