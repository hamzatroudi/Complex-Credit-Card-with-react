import React, { Component } from 'react';
import Puce from './puce.jpg';
import Master from './cardlogo.jpg';

const saisieCardnumber = (number) => {
    number = number.toString()
    
    let res = ''
    for(let i =0; i < 16; i += 4) {
      res += number.slice(i, i + 4) + ' '
    }
    return res
  }

  const saisiedate = number => {
    number = number.toString()
    if(number!=''){
        return number.slice(0, 2) + '/' + number.slice(2,4)
    }
    
  }

  const saisieholder = number => {
   if(number.length>20){
      return number.toUpperCase().slice(0,20)
   }
   else
   {
    return number.toUpperCase()  
   }
  }
  


class CreditCard extends Component {
    render() { 
        return ( 
            <div className='credi-card-container'>
                  <h1 className="titlecard">CREDIT CARD</h1>
                  <img src={Puce} className="img1"/>
                  
                  <p className="numcarte" >{saisieCardnumber(this.props.cardnumber)}</p>
                <div className="part">
                   <div className="part1">
                       <p className="p3">5422</p>
                   </div>
                    <div className="part2">
                            <div>
                                <p className="p4">VALID <br/>THRU</p>
                            </div>
                        <div className="part3">
                             <div><p className="p1">MONTH/YEAR</p></div>
                              <div className="p55"><p className="p5">{saisiedate(this.props.validThru)}</p></div>
                        </div>
                  
                    </div>
                    <div className="part4">
                    <img src={Master} className="img2" />
                    </div>
                  
                </div>
                  <p className="p6">{saisieholder(this.props.cardHolder)}</p>
                  
                  
                    
            </div>
         );
    }
}
 
export default CreditCard;