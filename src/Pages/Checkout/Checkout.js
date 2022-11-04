import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../../Contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(authContext);
  console.log(user.email);
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.first.value} ${form.last.value}`;

    const phone = form.phone.value;
    const email = user?.email || "unregistered";
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      message,
      phone,
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log(data);
          alert("Order Placed");
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl text-center">{title}</h2>
        <h4 className="text-3xl text-center">Price: {price}</h4>
      </div>
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control">
            <label className="input-group">
              <span>First Name</span>
              <input
                name="first"
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Last Name</span>
              <input
                name="last"
                type="text"
                placeholder="Last Name"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Phone</span>
              <input
                name="phone"
                type="number"
                placeholder="Your Phone"
                className="input input-bordered"
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder={user?.email}
                className="input input-bordered"
                readOnly
              />
            </label>
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="input-group">
            <span>Your Message</span>
            <textarea
              className="textarea textarea-info w-full"
              name="message"
              placeholder="Message"
            ></textarea>
          </label>
        </div>
        <input className="btn btn-success my-4" type="submit" value="Place Your Order" />
      </form>
    </div>
  );
};

export default Checkout;
