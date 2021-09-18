import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

export default class CustomerInfo extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            balance: 0
        }
    }

    componentDidMount() {
        axios.get('https://banksystemserver.herokuapp.com/customer/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    name: response.data.name,
                    balance: response.data.balance,
                    email: response.data.email
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-header">
                    <h5 class="card-title">Customer Info</h5>
                    </div>
                    <div class="card-body">
                        <div className="form-group"> 
                            <h5><label>Customer ID   : </label> {this.props.match.params.id}</h5>
                        </div>
                        <div className="form-group"> 
                            <h5><label>Name    : </label> {this.state.name}</h5>
                        </div>
                        <div className="form-group">
                            <h5><label>Email        : </label>  {this.state.email}</h5>
                        </div>
                        <div className="form-group">
                            <h5><label>Balance : </label>  {this.state.balance}</h5>
                        </div>
                        <br />
                        <div className="form-group">
                            <Link to={"/send/"+this.props.match.params.id}><input type="submit" value="Transfer Money" className="btn btn-primary" /></Link>
                        </div>
                        <br />
                        <p class="card-text">click 'Transfer Money' to Transfer money to other customers</p>
                        </div>
            </div>
        </div>
        )
    }
}