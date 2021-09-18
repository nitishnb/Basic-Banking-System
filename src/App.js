import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ViewCustomers from "./components/viewcustomers.component";
import Home from "./components/home.component";

import logo from "./logo.jpg";
import git from "./github.png";
import CustomerInfo from "./components/customer.component";
import SendMoney from "./components/sendmoney.component";
import Transfer from "./components/transfer.component";
import Transactions from "./components/viewtransactions.component";
import Success from "./components/success.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">&emsp;
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Basic Banking System</Link>&emsp;
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/view" className="nav-link">View All Customers</Link>
                </li>&emsp;
                <li className="navbar-item">
                  <Link to="/trans" className="nav-link">View All Transfers</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Home} />
          <Route path="/view" component={ViewCustomers} />
          <Route path="/send/:id" component={SendMoney} />
          <Route path="/sendto/:fromid/:toid" component={Transfer} />
          <Route path="/trans" component={Transactions} />
          <Route path="/info/:id" component={CustomerInfo} />
          <Route path="/success/" component={Success} />
          <div class="bottomright"><a href='https://github.com/nitishnb/Basic-Banking-System'><img src={git} width="30" height="30" /></a>Nitish N Banakar</div>
        </div>
      </Router>
    );
  }
}

export default App;