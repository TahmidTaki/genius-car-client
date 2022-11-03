import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { authContext } from "../../Contexts/AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(authContext);
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
    } else {
      //   console.log(email, password);
      createUser(email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="hero w-full">
      <div className="hero-content flex-col md:grid-cols-2 lg:flex-row gap-10">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">SignUp</h1>
          <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input type="submit" value="SignUp" className="btn btn-primary" />
            </div>
          </form>
          <p className="text-center ">
            Already Have an Acoount?
            <Link to="/login" className="link link-primary font-bold">
              'Login Here'
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
