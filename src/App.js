import React, { Component } from 'react';
import CreditCard from './creditcard';
import Form from './form';
import './App.css';
  
class App extends Component {
  
    constructor(props)
        {
      super(props)
     this.state = {
       numCard:'12345************',
       name:'Your Name',
       validdate:'****'
                  }
     
        }

        aff=(value)=>{
        this.setState(
              {numCard:value}
                     )
             }

             affName=(value)=>{
              this.setState(
                    {name:value}
                           )
                   }

                   affvaliddate=(value)=>{
                    this.setState(
                          {validdate:value}
                                 )
                         }
           
    
    
  render() {
    return (
      <div className="App">
      
      <CreditCard 
      cardnumber={this.state.numCard}
      validThru={this.state.validdate}
      cardHolder={this.state.name}
      />
      <br></br>

     <Form affich={this.aff} affich2={this.affName} affich3={this.affvaliddate}/>
  


      </div>
    );
  }
}

export default App;
