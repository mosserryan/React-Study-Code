import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // For JSON server to test without backup for duplicate emails //
  const getUsers = async (email) => {
    const res = await fetch("http://localhost:5000/users");

    const data = await res.json();

    const sameEmail = await data.some((i) => i.email.includes(email));

    console.log(data);

    return sameEmail;
  };

  const registerUser = async (user) => {
    // fetch user DB and then insert a new user using the POST method.
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      // The body will contain the data which is the user object converted to a readable JSON object.
      body: JSON.stringify(user),
    });

    // In order for us to have readable JSON object we will also convert the response to JSON once it has completed using await.
    const data = await res.json();
    console.log(data);

    onRegisterSuccess(data);
  };

  const onRegisterSuccess = (data) => {
    console.log("On Success", data);
    Swal.fire({
      icon: "success",
      title: "You have successfully registered!",
      text: `Welcome to the team ${data.firstName}!`,
      heightAuto: false,
    });
    history.push("/login");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      alert("Please add a First Name!");
    } else if (!lastName) {
      alert("You must add a Last Name!");
    } else if (!email) {
      alert("You must add a Email!");
    } else if (!password) {
      alert("You must add a Password!");
    } else if (!confirmPassword) {
      alert("You must Confirm Password!");
    } else if (password !== confirmPassword) {
      alert("Password and Confirm Password must match!");
      return;
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      confirmPassword === password
    ) {
      // For JSON server to test without backup for duplicate emails //
      const checkEmail = await getUsers(email);
      // For JSON server to test without backup for duplicate emails //
      if (checkEmail === false) {
        registerUser({ firstName, lastName, email, password });

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
      } else {
        toast.error("Email Already Exists");
      }
    }
  };

  const TogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h2 className="user-form-title">Maui Vision</h2>
            <h5>Register New Team Member</h5>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fab fa-facebook-square" />
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
              <label>First Name</label>
              <div className="input-group form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <label>Last Name</label>
              <div className="input-group form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <label>Email</label>
              <div className="input-group form-group">
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
              <label>Confirm Password</label>
              <div className="input-group form-group bottom">
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
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-warning btn-block login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Already have an account?<Link to="/login">Sign In</Link>
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

export default withRouter(RegisterForm);
