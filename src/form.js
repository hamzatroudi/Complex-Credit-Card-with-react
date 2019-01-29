import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { numCard:'',
                       name:"",
                       dateValid:""
                       
                      }
    }
    
    handlechange=(event)=>{
        this.setState({numCard : event.target.value})
        this.props.affich(event.target.value)
    }

    handlechange2=(event)=>{
        this.setState({name : event.target.value})
        this.props.affich2(event.target.value)
    }
    handlechange3=(event)=>{
        this.setState({dateValid: event.target.value})
        this.props.affich3(event.target.value)
    }


    //or:  handlechange=(event)=>{
      //  this.setState({[event.target.name] : event.target.value
        //})
        //if([event.target.name]=='card_num')
        //{this.props.affich(event.target.value)}
        //if([event.target.name]=='name')
        //{this.props.affname(event.target.value)}
        //else
        //{this.props.affdate(event.target.value)}
       //}
    render() { 
        return ( <div>
            <input type='text' onChange={this.handlechange}/><br></br>
            <input type='text' onChange={this.handlechange2}/><br></br>
            <input type='text'  onChange={this.handlechange3}/>


        </div> );
    }
}
 
export default Form;
 