import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    return localStorage.getItem('token') ? (
      <Route {...this.props}/>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
