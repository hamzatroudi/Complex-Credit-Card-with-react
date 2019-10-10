import React from "react"
import { Component } from "react"
import { getCoachfById, getserviceById, getdispoCoach, gethourCoach } from "../service"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { css } from 'emotion';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Datatable from 'react-bs-datatable';
import {
   Col,
   Row,
} from 'reactstrap';
import Calendar from 'react-calendar';
import './coach.css'







class CoachDetail extends Component {
   constructor(props) {
      super(props)
      this.gethour = this.gethour.bind(this);

      this.state = {
         name: "",
         pays: "",
         ville: "",
         telephone: "",
         gender: "",
         specialité: "",
         latitude: "",
         longitude: "",
         deplacement: "",
         description: "",
         nom: "",
         prix: "",
         listdesservice: [],
         date: new Date(),
         dispoDay: [],
         selectedDays: [],
         hoursReserved:[],
         selectedDay: undefined,


      }

   }

   /* handleMonthChange() {
       const dates = this.state.getdispoCoach(id,month);
       this.setState({availableDates: dates});
   }*/

  gethour(day) {
      var checkDate = moment(day);
      checkDate = checkDate.format('YYYY-MM-DD')
      const { id } = this.props.match.params

      gethourCoach(id, checkDate).then(result => {
         console.log(result);
         this.setState({ selectedDay: day,hoursReserved:result.data })
      })
         .catch(err => console.log({ err }))




   }



   getday(date) {
      console.log({ date })
      const { id } = this.props.match.params
      var checkDate = moment(date, 'YYYY,MM,DD');
      var month = checkDate.format('M');
      getdispoCoach(id, month).then(resultdis => {
         const { data: dispo } = resultdis
         let newDispo = [];

         for (let d of dispo) {
            var h = d.split("-").join(",")
            var date = new Date(h)
            if (!newDispo.includes(date))
               newDispo = [...newDispo, date]

         }
         this.setState({ dispoDay: newDispo, date: new Date(checkDate) })
         console.log(newDispo)
      }).catch(err => console.log({ err }))
   }

   



   componentWillMount() {

      const { id } = this.props.match.params

      this.getday(this.state.date)
      getCoachfById(id).then(result => {

         const { name, pays, telephone, ville, gender, specialité, latitude, longitude, deplacement, description } = result.data
         this.setState({ name, pays, telephone, ville, gender, specialité, latitude, longitude, deplacement, description })
      }).catch(err => console.log({ err }))



      getserviceById(id).then((results) => {
         console.log({ results })

         const servicessAll = results.data.map(function (item) {
            return {
               service: item.nom,
               prix: item.prix,


            };

         });
         this.setState({ listdesservice: servicessAll });
         console.log({ servicessAll })

      })

   }



   /* handleDayClick(day, { selected }) {
       const   selectedDays=[]
       if (selected) {
         const selectedIndex = selectedDays.findIndex(selectedDay =>
           DateUtils.isSameDay(selectedDay, day)
         );
         selectedDays.splice(selectedIndex, 1);
       } else {
         selectedDays.push(day);
       }
       this.setState({ dispoDay:selectedDays });
     }*/


   render() {
      const header = [
         {
            title: 'Service',
            prop: 'service',
            sortable: true,

         },
         {
            title: 'Prix ',
            prop: 'prix',
            sortable: true,

         },





      ];

      const body = this.state.listdesservice

      const onSortFunction = {
         date(columnValue) {
            // Convert the string date format to UTC timestamp
            // So the table could sort it by number instead of by string
            return moment(columnValue, 'Do MMMM YYYY').valueOf();
         }
      };

      const customLabels = {
         first: '<<',
         last: '>>',
         prev: '<',
         next: '>',
         show: 'Display',
         entries: 'rows',
         noResults: 'There is no data to be displayed'
      };

      const classes = {
         theadCol: css`
        .table-datatable__root & {
          &.sortable:hover {
            background: pink;
          }
        }
      `,
         tbodyRow: css`
        &:nth-of-type(even) {
          background: #eaeaea;
        }
      `,
         paginationOptsFormText: css`
        &:first-of-type {
          margin-right: 8px;
        }
        &:last-of-type {
          margin-left: 8px;
        }
      `
      };

      const { name, pays, telephone, ville, specialité, latitude, longitude, deplacement, description, gender, nom, prix, dispoDay } = this.state
      return (
         <React.Fragment>
            <div className="tabb">
               <Tabs>
                  <TabList>
                     <Tab>Information</Tab>
                     <Tab>Disponibilité</Tab>
                     <Tab>Services</Tab>
                  </TabList>

                  <TabPanel>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Nom:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {name}
                        </div>
                     </div>

                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Téléphone:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {telephone}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Ville:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {ville}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Pays:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {pays}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Specialité:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {specialité}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Latitude:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {latitude}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Longitude:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {longitude}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Description:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {description}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Déplacement:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {deplacement}
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-3 col-md-2 col-5">
                           <label >Genre:</label>
                        </div>
                        <div class="col-md-8 col-6">
                           {gender}
                        </div>
                     </div>



                  </TabPanel>

                  <TabPanel>
                     {/*<DayPicker
                        selectedDays={["2019-9-15"]}
                        onDayClick={this.handleDayClick}
                     />*/}

                     <DayPicker

                        initialMonth={this.state.date}
                        selectedDays={dispoDay}
                        onMonthChange={(date) => this.getday(date)}
                        onDayClick={this.gethour}
                     />
                    
<div> {this.state.hoursReserved.map(
      (hour,index)=><p className="hourdispo" key={index}>{hour}</p>
                                   )
      }
</div>

                  </TabPanel>
                  <TabPanel>

                     <Row>

                        <Col lg={6} md={12} sm={12} xs={12}>
                           <Datatable
                              tableHeaders={header}
                              tableBody={body}
                              tableClass="striped hover responsive"


                              labels={customLabels}
                              classes={classes}
                              onSort={onSortFunction}

                           />
                        </Col>
                     </Row>


                  </TabPanel>
               </Tabs>



            </div>


         </React.Fragment>
      )
   }
}
export default CoachDetail