import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

import dlt from "../select.jpg";


const Transaction = props => (
    <tr>
        <td></td>
        <td>{props.trans.from}</td>
        <td>{props.trans.to}</td>
        <td>{props.trans.amount}</td>
        <td>{props.trans.date}</td>
    </tr>
)

export default class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {transactions: []};
    }

    componentDidMount() {
        axios.get('https://banksystemserver.herokuapp.com/transaction/')
            .then(response => {
                console.log(response.data);
                return this.setState({ transactions: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    transactionList() {
        return this.state.transactions.map(function(currentTransaction, i){
            return <Transaction trans={currentTransaction} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 align="center">Transaction History</h3>
                <table  class="table table-hover table-light" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Sl. no</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount (₹)</th>
                            <th>Date/Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.transactionList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
