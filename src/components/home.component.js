import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends Component {
    render(){
        return(
            <div align="center">
                <h3>
                    Welcome! To Banking System
                </h3>
                <br></br>
                <br></br>
                <br></br>
                <div class="btn-group btn-group-lg">
                    <Link to="/view" class="btn btn-dark">Customers</Link>
                </div>&emsp;
                <div class="btn-group btn-group-lg">
                    <Link to="/trans" class="btn btn-dark">History</Link>
                </div>
            </div>
        )
    }
}