import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

import dlt from "../select.jpg";


const Customer = props => (
    <tr>
        <td></td>
        <td>{props.cust.name}</td>
        <td>{props.cust.email}</td>
        <td>{props.cust.balance}</td>
        <td>
            <Link to={"/info/"+props.cust._id}><img src={dlt} width="30" height="30" title="Delete"/></Link>
        </td>
    </tr>
)

export default class ViewCustomers extends Component {

    constructor(props) {
        super(props);
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
            return <Customer cust={currentCustomer} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 align="center">Customers</h3>
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
            </div>
        )
    }
}
