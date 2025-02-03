import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
  
    address: "",
    phoneNumber: "",
    email: "",
    gender: "",
    country: "",
    city: "",
    passport: "",
    zipcode: 0,
    userPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the response structure
        const countryList = data.map(country => country.name.common).sort();
        setCountries(countryList);
      })
      .catch(error => console.error("Error fetching countries:", error));
  }, []);
  
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.userPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9090/client", {
        userFirstName: formData.userFirstName,
        email: formData.email,
        userPassword: formData.userPassword,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        zipcode: formData.zipcode,
        passport: formData.passport,
        userLastName: formData.userLastName,
      });

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data || "An error occurred during registration. Try again.",
        console.log(error)
      );
    }
  };

  return (
    <div className="register-container">
        <div className="register-box">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Registration Page</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
      />
      <link
        rel="stylesheet"
        href="../../plugins/fontawesome-free/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css"
      />
      <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />

      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">Registration</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register new account</p>
            <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">

              <div className="input-group mb-3">
                <input
                  type="text"
                  name="userFirstName"
                  value={formData.userFirstName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="First Name"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>
              <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="userLastName"
                  value={formData.userLastName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Last Name"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>
              </div>

              <div className="row">
                <div className="col-md-6">
              
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              </div>
              <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              </div>
              </div>

               <div className="row">
                 <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Retype password"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              </div>
             
             <div className="col-md-6">
                <div className="input-group mb-3">
                <input
                  type="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Address"
                  required
                />
                 <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-map-marker-alt" />
                  </div>
                </div>
                </div>
                </div>
                </div>

                 <div className="row">
                  <div className="col-md-6">
                <div className="input-group mb-3">
                <input
                  type="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Phone Number"
                  required
                />
                 <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-phone" />
                  </div>
                </div>
                </div>
                </div>

                  <div className="col-md-6">
                <div className="input-group mb-3">
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="form-control"
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>


                  <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-transgender" />
                  </div>
                </div>
                </div>
                </div>
                </div>

                 <div className="row">
                  <div className="col-md-6">
                <div className="input-group mb-3">
  
                <select
  name="country"
  value={formData.country || ""}
  onChange={handleChange}
  className="form-control"
  required
>
  <option value="">Select a Country</option>
  {countries.length > 0 ? (
    countries.map((country, index) => (
      <option key={index} value={country}>
        {country}
      </option>
    ))
  ) : (
    <option>Loading countries...</option>
  )}
</select>

  <div className="input-group-append">
    <div className="input-group-text">
      <span className="fas fa-globe" />
    </div>
  </div>
</div>
</div>

                 <div className="col-md-6">
                <div className="input-group mb-3">
                <input
                  type="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="City"
                  required
                />
                </div>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Zipcode"
                      required
                    />
                  </div>
                  </div>
<div className="col-md-6">

                <div className="input-group mb-3">
                <input
                  type="passport"
                  name="passport"
                  value={formData.passport}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Passport Number"
                  required
                />
                 <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-passport" />
                  </div>
                </div>
                </div>
                </div>
                </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      required
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div>
            <a href="/login" className="text-center">
              I already have a membership
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
