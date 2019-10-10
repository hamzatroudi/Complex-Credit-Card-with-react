import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { getSportifById } from "../service"
import Avatar from '@material-ui/core/Avatar'
import './Add.css';
import Fab from '@material-ui/core/Fab'
import { editSportif } from '../service'
import { editPhotoSportif } from '../service'

import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from "react-notifications"



class Editsportif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomPre: "",
            pays: "",
            ville: "",
            telephone: "",
            height: "",
            weight: "",
            adress:"",
            gender: "",
            image: null,
            imageSrc: null,
            loading: false,
            

            message: ""

        }
        console.log(props.match.params.id)
    }
    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value }, () => console.log(this.state))
    }
    handleNumbers = evt => {
        this.setState({
            [evt.target.name]: evt.target.validity.valid
                ? evt.target.value
                : this.state[evt.target.name]
        })
    }


 

    
  
   /*handleImageChange = event => {
        his.setState({
            image: event.target.files[0],
            imageSrc: URL.createObjectURL(event.target.files[0])

        })
   
        
    }*/



    handleImageChange= event =>{
        const { id } = this.props.match.params
       const image=event.target.files[0]
        var sportif=new FormData()
        sportif.append('file', image);
        
        editPhotoSportif(id,sportif)

        .then((res) => {
            console.log(res);
            this.setState({   image,
                imageSrc: URL.createObjectURL(image) })

        })
        .catch((err) => alert(err))
}


   





    
   /* editersportif = () => {

        const { nomPre, pays, telephone, ville, height, weight ,adress ,gender,image} = this.state
       
        console.log({nomPre, pays, telephone, ville, height, weight,adress, gender })
        const newSportif = JSON.stringify(
            { nomPre, pays, ville, telephone, height, weight,adress });
          
           
        const { id } = this.props.match.params
        editSportif(id, newSportif)

            .then((res) => {
                console.log(res);
                this.setState({ loading: false })


                alert("Sportif modifié!")




            })
            .catch((err) => alert(err))
            

    }*/


    editersportif = () => {

        const { nomPre, pays, telephone, ville, height, weight ,adress ,gender,image} = this.state
       
        console.log({nomPre, pays, telephone, ville, height, weight,adress, gender })
        const newSportif = JSON.stringify(
            { nomPre, pays, ville, telephone, height, weight,adress });
          
           
        const { id } = this.props.match.params
        editSportif(id, newSportif)

            .then((res) => (
                NotificationManager.success("Edit avec success", "", 3000),
                console.log(res),
                this.setState({ loading: false })
              )
            )
            .catch(err =>
                NotificationManager.error(
                  "Une erreur d edit, essayer une autre fois",
                  ""
                )
              )
            



    }
    componentWillMount() {
        const { id } = this.props.match.params
        getSportifById(id).then(result => {
            console.log(result.data)
            const { nomPre, profileImage: imageSrc, pays, telephone, ville, gender, height, weight } = result.data
            this.setState({ nomPre, pays, telephone, ville, gender, height, weight, imageSrc })
        }).catch(err => console.log({ err }))
    }


    render() {

        const { nomPre, pays, telephone, ville, height, weight, imageSrc } = this.state

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
                                            src={imageSrc ? imageSrc : require('./images/dummy-profile-pic.jpg')}
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
                                                name="nomPre"
                                                value={nomPre}
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
                                                type="text"
                                                placeholder="pays"
                                                name="pays"
                                                value={pays}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                                required
                                            />
                                            <div className="input-icon">
                                                <i class="fas fa-globe" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="text"
                                                placeholder="Ville"
                                                name="ville"
                                                value={ville}
                                                onChange={this.handlechange}
                                                data-tip={`Required`}
                                            />
                                            <div className="input-icon">
                                                <i class="fas fa-house-damage" />
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
                                                <i class="fas fa-phone" />
                                            </div>
                                        </div>
                                    </div></div>

                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                placeholder="Height"
                                                name="height"
                                                onChange={this.handlechange}
                                                value={height}
                                                data-tip={`Required`}
                                            />
                                            <div className="input-icon">
                                                <i class="fas fa-arrows-alt-v" />
                                            </div>
                                        </div>
                                    </div></div>

                                <div className="row">
                                    <div className="col-full">
                                        <div className="input-group input-group-icon">
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                placeholder="Weight"
                                                name="weight"
                                                onChange={this.handlechange}
                                                value={weight}
                                                data-tip={`Required`}
                                            />
                                            <div className="input-icon">
                                                <i class="fas fa-weight" />
                                            </div>
                                        </div>
                                    </div></div>

                                <div className="input-group input-group-icon">
                                    <select
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={this.handlechange}
                                        data-tip={`Required`}
                                    >
                                        <option value="" selected>
                                            Genre
                        </option>
                                        <option>Male</option>
                                        <option>Female</option>

                                    </select>

                                </div>
                            </CardContent>


                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={this.handleImageChange}
                                ref={(fileInput => this.fileInput = fileInput)} />

                            <div className="btnsportifs">
                                <button
                                    type="submit"

                                    className="btn-submit"
                                    onClick={this.editersportif}
                                >
                                    Editer
          </button></div>
                        </Card>
                    </Grid>
                </Grid>
                <NotificationContainer />


            </div>


        )
    }
}












export default Editsportif