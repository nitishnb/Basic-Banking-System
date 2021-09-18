import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

export default class Transfer extends Component {

    constructor(props) {
        super(props);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            balance: 0,
            amount: 0,
            toname: '',
            toemail: '',
            tobalance: 0
        }
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    componentDidMount() {
        axios.get('https://banksystemserver.herokuapp.com/customer/'+this.props.match.params.fromid)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    balance: response.data.balance,
                    email: response.data.email
                });
                axios.get('https://banksystemserver.herokuapp.com/customer/'+this.props.match.params.toid)
                .then(response => {
                    this.setState({
                        toname: response.data.name,
                        tobalance: response.data.balance,
                        toemail: response.data.email
                    })   
                })
                .catch(function (error) {
                    console.log(error);
                }) 
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        if(window.confirm("Are you sure to Transfer Amount?")){
            if(this.state.amount <= 0) {
                alert("Entered Amount should greater than 0")
            } else if(this.state.amount > this.state.balance) {
                alert("Amount exceeds Balance")
            } else {
                console.log(this.state.amount);

                var today = new Date(),
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        + ' / ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();;

                const obj = {
                    name: this.state.name,
                    email: this.state.email,
                    balance: this.state.balance - this.state.amount
                };
                console.log(obj);
                axios.post('https://banksystemserver.herokuapp.com/customer/update/'+this.props.match.params.fromid, obj)
                    .then(res => console.log(res.data));
                const obj2 = {
                    name: this.state.toname,
                    email: this.state.toemail,
                    balance: +this.state.tobalance + +this.state.amount
                };
                console.log(obj2);
                axios.post('https://banksystemserver.herokuapp.com/customer/update/'+this.props.match.params.toid, obj2)
                    .then(res => console.log(res.data));
                const obj3 = {
                    from: this.state.name,
                    to: this.state.toname,
                    amount: this.state.amount,
                    date: date
                };
                console.log(obj3);
                axios.post('https://banksystemserver.herokuapp.com/transaction/add', obj3)
                    .then(res => console.log(res.data));
                this.props.history.push("/success");
            }
        } 
    }


    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-header">
                    <h5 class="card-title">From</h5>
                    </div>
                    <div class="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group"> 
                                <h6><label>Customer ID   : </label> {this.props.match.params.fromid}</h6>
                            </div>
                            <div className="form-group"> 
                                <h6><label>Name    : </label> {this.state.name}</h6>
                            </div>
                            <div className="form-group">
                                <h6><label>Email        : </label>  {this.state.email}</h6>
                            </div>
                            <div className="form-group">
                                <h6><label>Balance : </label>  {this.state.balance}</h6>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label>Enter Amount to Transfer: </label>
                                <input type="number" className="form-control" value={this.state.amount} onChange={this.onChangeAmount} required/>
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="submit" value="Transfer Money" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
            </div>
            <br></br>
            <div class="card">
                    <div class="card-header">
                    <h5 class="card-title">To</h5>
                    </div>
                    <div class="card-body">
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group"> 
                            <h6><label>Customer ID   : </label> {this.props.match.params.toid}</h6>
                        </div>
                        <div className="form-group"> 
                            <h6><label>Name    : </label> {this.state.toname}</h6>
                        </div>
                        <div className="form-group">
                            <h6><label>Email        : </label>  {this.state.toemail}</h6>
                        </div>
                        <div className="form-group">
                            <h6><label>Balance : </label>  {this.state.tobalance}</h6>
                        </div>
                        <br />
                        </form>
                    </div>
            </div>
        </div>
        )
    }
}