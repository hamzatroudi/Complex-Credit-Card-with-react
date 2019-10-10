import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {addSports} from '../service'
import Avatar from '@material-ui/core/Avatar'
import '../sportifs/Add.css';
import Fab from '@material-ui/core/Fab'
import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from "react-notifications"



class Addsport extends Component {
    constructor(props) {
        super(props);
        this.state={
           name:"",
           
            image: null,
        imaegSrc: null,
        loading:false,
        
        message:""

        }


    }
    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value },()=>console.log(this.state))
    }
    
    handleImageChange = event => {
        this.setState({
            image: event.target.files[0],
            imageSrc: URL.createObjectURL(event.target.files[0])
        
        })
    }


    insert_sport = () => {
        
        const {name,image}=this.state
        var sport=new FormData()
        console.log(image)
        sport.append('file', image);
        
        sport.append('catJson', JSON.stringify(
            {name}));
        console.log(sport)
        addSports(sport)
        .then((res) => {
            console.log(res);
            this.setState({loading:false})
           
            if (res.data.message=== "sport is already taken!") {
                this.setState({message:"Sport déja existant!"})
                NotificationManager.error(
                    "Sport déja existant!",
                    ""
                  )
          
            }

            else {
                NotificationManager.success("Ajout avec success", "", 3000)
            }
                this.setState({
                    name:"",
                  
                   imageSrc:require('./images/dummy-sport-pic.gif')
            
                  })
            
            
        })
        .catch((err) => {
            console.log({err})
            if (err.response.status===400){
                this.setState({message:"Veuillez sélectionner une photo de sport", loading:false})
                alert("Veuillez sélectionner une photo de sport")
            }
            else {
            this.setState({message:'Une erreur est survenue', loading:false})
            alert("Une erreur est survenue")
            }
        })
      }









    
    render() {
       
const {name}=this.state
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
                        <Card style={{ width: '500px', padding: '70px 80px' , marginTop:'-130px'}}>
                            <CardHeader
                                avatar={
                                    <Avatar style={{ marginLeft: '45%', width: '150px', height: '150px', border: '1px solid grey' }}>
                                        <img
                                            style={{ width: '200px', height: '200px', position: 'absolute' }}
                                            src={this.state.imageSrc?this.state.imageSrc:require('./images/dummy-sport-pic.gif')}
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
                                                placeholder="catégorie de sport"
                                                name="name"
                                                value={name}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                                validators={validators}
                                                errorMessages={errorMessages}
                                                required
                                               
                                            />
                                            <div className="input-icon">
                                            <i class="fas fa-running"/>
                                            </div>
                                        </div>
                                    </div>
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
            onClick={this.insert_sport}
          >
           Ajouter
          </button>
          </div>
          
                        </Card>
                    </Grid>
                    
                </Grid>
                <NotificationContainer />
                
            </div>


        )
    }
}












export default Addsport