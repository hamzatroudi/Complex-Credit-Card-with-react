import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {addCoach} from '../service'
import Avatar from '@material-ui/core/Avatar'
import '../sportifs/Add.css';
import Fab from '@material-ui/core/Fab'

import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from "react-notifications"



class AddCoach extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
           
            email:"",
            password:"",
            telephone:"",
           gender:"",
            image: null,
        imaegSrc: null,
        loading:false,
        
        message:""

        }

    }
    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value },()=>console.log(this.state))
    }



    handlechangeEmail = event => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.setState({ [event.target.name]: event.target.value },()=>
        console.log(this.state))

            if (!re.test(this.state.email) ) {
                NotificationManager.error(  
                    "Email invalide",
                    "",2000
                  )
             
            } 
          
        
    }

    


    handleNumbers = evt => {
        this.setState({
          [evt.target.name]: evt.target.validity.valid
            ? evt.target.value
            : this.state[evt.target.name]
        })
      }
    handleImageChange = event => {
        this.setState({
            image: event.target.files[0],
            imageSrc: URL.createObjectURL(event.target.files[0])
        
        })
    }
    insert_coach = () => {
        
        const {username,email,telephone,password,gender,image}=this.state
        var coach=new FormData()
        coach.append('file', image);
        coach.append('itemJson', JSON.stringify(
            {username,email,telephone,password,gender}));
       
        addCoach(coach)
        .then((res) => {
            console.log(res);
            this.setState({loading:false})
            if(res.data.message==="Email is already taken!") {
                this.setState({message:"Email déja existant!"})
                alert("email is already taken!")
            }
            else if (res.data.message=== "Username is already taken!") {
                this.setState({message:"Username déja existant!"})
                alert("Username is already taken!")
            }

            else {
                NotificationManager.success("Ajout avec success", "", 3000)
            }
                this.setState({
                    username:"",
                   
            email:"",
            password:"",
            telephone:"",
            imageSrc:require('./images/dummy-profile-pic.jpg')
                  })
            
            
        })
        .catch((err) => {
            console.log({err})
            if (err.response.status===400){
                this.setState({message:"Veuillez sélectionner une photo de profil", loading:false})
                alert("Veuillez sélectionner une photo de profil")
            }
            else {
            this.setState({message:'Une erreur est survenue', loading:false})
            alert("Une erreur est survenue")
            }
        })
      }
   
    render() {
       
const {username,email,telephone,password}=this.state
const validators=['required'];
var errorMessages = "this field is required";
        return (

            <div className="col-xs-12 col-md-12" style={{ padding: '0' }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid item xs={9}>
                        <Card style={{ width: '500px', padding: '70px 80px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar style={{ marginLeft: '45%', width: '150px', height: '150px', border: '1px solid grey' }}>
                                        <img
                                            style={{ width: '200px', height: '200px', position: 'absolute' }}
                                            src={this.state.imageSrc?this.state.imageSrc:require('./images/dummy-profile-pic.jpg')}
                                            alt="">
                                        </img>
                                        <Fab
                                            color="secondary"
                                            aria-label="edit"
                                            className=""
                                            onClick={() => this.fileInput.click()}>
                                            <i className="fas fa-camera"></i>
                                        </Fab>
                                    </Avatar>}>
                            </CardHeader>

                            <CardContent>

                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                value={username}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                                required
                                               
                                            />
                                            <div className="input-icon">
                                                <i className="fa fa-user" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                             
                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                            
                                           
                                          
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={email}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                                validators={validators}
                                                errorMessages={errorMessages}
                                                onBlur={this.handlechangeEmail}
                                                required
                                                
                                            />
                                            <div className="input-icon">
                                            <i className="fas fa-at"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="password"
                                                placeholder="Mot de passe"
                                                name="password"
                                                value={password}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                            />
                                            <div className="input-icon">
                                            <i class="fas fa-unlock"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              

                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                placeholder="Telephone"
                                                name="telephone"
                                                onChange={this.handleNumbers}
                                                value={telephone}
                                                data-tip={`Required`}
                                            />
                                            <div className="input-icon">
                                            <i class="fas fa-phone"/>
                                            </div>
                                        </div>
                                    </div></div>

                                    <div className="input-group input-group-icon">
                                    <select
                                        name="gender"

                                        onChange={this.handlechange}
                                        data-tip={`Required`}
                                    >
                                        <option value={this.state.gender} selected>
                                            Genre
                        </option>
                                        <option>Male</option>
                                        <option>Female</option>

                                    </select>
                                    
                                </div>
                            </CardContent>

                           
                            <input 
                      type="file" 
                      style={{display:'none'}} 
                      onChange={this.handleImageChange}
                      ref={(fileInput => this.fileInput = fileInput)}/>

                      <div className="btnsportifs">
                      <button
            type="submit"
           
            className="btn-submit"
            onClick={this.insert_coach}
          >
           Ajouter
          </button></div>
                        </Card>
                    </Grid>
                </Grid>
<NotificationContainer/>
                
            </div>


        )
    }
}












export default AddCoach