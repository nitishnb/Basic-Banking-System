import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

import dlt from "../select.jpg";

let fromid;

const Customer = props => (
    <tr>
        <td></td>
        <td>{props.cust.name}</td>
        <td>{props.cust.email}</td>
        <td>{props.cust.balance}</td>
        <td>
            <Link to={fromid===props.cust._id?"#":"/sendto/"+fromid+"/"+props.cust._id}>
                <img src={dlt} width="30" height="30" title="Delete"/>
            </Link>
        </td>
    </tr>
)

export default class SendMoney extends Component {

    constructor(props) {
        super(props);
        fromid = props.match.params.id;
        this.state = {customers: []};
    }

    componentDidMount() {
        axios.get('https://banksystemserver.herokuapp.com/customer/')
            .then(response => {
                console.log(response.data);
                return this.setState({ customers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    custList() {
        return this.state.customers.map(function(currentCustomer, i){
            if(fromid!=currentCustomer._id)
                return <Customer cust={currentCustomer} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 align="center">Select Customer to Transfer Money</h3>
                <table  class="table table-hover table-light" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Sl. no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance (₹)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.custList() }
                    </tbody>
                </table>
                <p>From and To accounts are different</p>
            </div>
        )
    }
}