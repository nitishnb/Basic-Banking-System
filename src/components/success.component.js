import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

export default class Success extends Component {
    render() {
        return (
            <div class="card">
            <center>
            <div>
                <i class="checkmark">✓</i>
            </div>
                <h1>Success</h1> 
                <p>Money Transfer Successful<br/></p>
                <Link to={"/trans"}><input type="submit" value="Tranfer History" className="btn btn-primary" /></Link>&emsp;
                <Link to={"/"}><input type="submit" value="Go Home" className="btn btn-primary" /></Link>
            <br/><br/>
            </center>
            </div>
        )
    }
}