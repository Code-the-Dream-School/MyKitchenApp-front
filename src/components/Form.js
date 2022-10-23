import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <div className="form">
      <h1>Log in</h1>
      <form className="form-group">
        <input type="email" name="email" id="email" placeholder="Your e-mail" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Form;
