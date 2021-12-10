import React from 'react';
import Cards from 'react-credit-cards';
import CreditCardInput from 'react-credit-card-input';
import { Button,Alert } from 'antd';
import axios from 'axios';





export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    loadings: [],
    done : false,
    err:false
  };
  userId =  localStorage.getItem('userId').replace('"',"").replace('"','').toString()
  enterLoading = async index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;
      return {
        loadings: newLoadings,
      };
    })
    
    if(this.state.number==='4916 4610 5689 5104'){
        await axios.patch(`http://localhost:5000/api/premium/${this.userId}`)
                    .then(localStorage.setItem("isPremium", true))
                    .then(  setTimeout(() => { 
                                                this.setState({done: true}) 
                                                this.setState({err: false})
                                                this.setState({loadings: []})
                                            }, 3000))
                    .catch(err=>console.log(err))
                    
    }else{
        setTimeout(() => { this.setState({loadings: []}) 
        this.setState({err: true})
    }, 3000)
    }
    }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    const { loadings } = this.state
    return (
      <div id="PaymentForm" style={{textAlign:'center', margin:'2rem'}}>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <div style={{padding:'2px'}}>
        <form>
          <CreditCardInput
              cardNumberInputProps={{ name:"number", onChange: this.handleInputChange, onFocus:this.handleInputFocus}}
              cardExpiryInputProps={{ name:"expiry", onChange: this.handleInputChange, onFocus:this.handleInputFocus }}
              cardCVCInputProps={{ name:"cvc", onChange: this.handleInputChange, onFocus:this.handleInputFocus }}
              fieldClassName="input"
            />
        </form></div>
        {!this.state.done && <div style={{padding:'4px'}}>
        <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
            Pay Now
        </Button></div>}

        {this.state.err && <Alert
      message="Payment Failed !"
      description="Please Check your payment information and try again."
      type="error"
      showIcon
      /> }
      {this.state.done && <Alert
      message="Payment Done !"
      description="Thank you for your trust"
      type="success"
      showIcon
      /> }
      </div>
    );
  }
}