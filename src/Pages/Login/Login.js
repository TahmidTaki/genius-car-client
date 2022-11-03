import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };
  return (
    <div className="hero w-full">
      <div className="hero-content flex-col md:grid-cols-2 lg:flex-row gap-10">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
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
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
          </form>
          <p className="text-center ">
            New to Genius Car? Register
            <Link to="/register" className="link link-primary font-bold">
              ' Here'
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
