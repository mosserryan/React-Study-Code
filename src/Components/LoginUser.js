import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const LoginForm = ({ login }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const TogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please add a username!");
    } else if (!password) {
      alert("You must add a password!");
      return;
    }
    if (email && password) {
      const singleUser = await getUser(email);

      if (singleUser.email && singleUser.password === password) {
        login({ email, password });
        history.push("/userDashboard");
      } else {
        toast.error("Incorrect Email or Password");
      }
    }
  };

  const getUser = async (email) => {
    //Having to grab all the users, need to find another way later.
    const res = await fetch("http://localhost:5000/users");

    const data = await res.json();
    console.log(data);

    let userObj;

    data.forEach((user) => {
      if (user.email === email) {
        userObj = user;
      }
    });

    return userObj;
  };

  /* const getSingleUser = async (email) => {
    const res = await fetch(`http://localhost:5000/users/${email}`);
    const data = await res.json();

    return data;
  }; */

  return (
    <div className="container">
      <ToastContainer />
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h2 className="user-form-title">Maui Vision</h2>
            <h5>Team Member</h5>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <Link
                  to="https://www.facebook.com/MauiVisionRentals"
                  className="fab fa-facebook-square"
                />
              </span>
              <span>
                <i className="fab fa-google-plus-square" />
              </span>
              <span>
                <i className="fab fa-twitter-square" />
              </span>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <label>Email</label>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label>Password</label>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span onClick={TogglePassword} className="input-group-text">
                    <i
                      className={
                        showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }
                    />
                  </span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" />
                Remember Me
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Sign In"
                  className="btn btn-warning float-right login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<Link to="/register">Sign Up</Link>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
