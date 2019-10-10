import React from 'react';
import { css } from 'emotion';
import Fab from '@material-ui/core/Fab';


import Datatable from 'react-bs-datatable';
import {
  Col,
  Row,
} from 'reactstrap';
import { getAllSports } from '../service';


class Listesports extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = { listdessports:[] };
  }

  componentWillMount() {
    
    getAllSports().then( (results) =>{
      console.log({results})
      
      const   sportsAll =  results.data.map(function(item) {
       return   { 
         nom: item.name,
         date_creation: item.date_creation,
       
         image:<img  src={item.icon} style={{height:"35px", width:"50px"}}/>
      
       
      
                        
        };

      });
      this.setState({ listdessports: sportsAll });
      console.log({sportsAll})

    })

    
  }
 
  
 
  render() {
   
    
    
    
    const header = [
      {
        title: 'image',
        prop: 'image',
       
       
      },
      {
        title: 'Nom ',
        prop: 'nom',
        sortable: true,
        filterable: true
      },
      
      
      { title: 'Date Creation', prop: 'date_creation', sortable: true },
      
      

    ];

    const body = this.state.listdessports

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
    return (
      
        <Row>
       
          <Col lg={12} md={12} sm={12} xs={12}>
            <Datatable
              tableHeaders={header}
              tableBody={body }
              tableClass="striped hover responsive"
              rowsPerPage={10}
              rowsPerPageOption={[10, 20, 50, 100]}
              labels={customLabels}
              classes={classes}
              onSort={onSortFunction}
              
            />
          </Col>
        </Row>
     
    );
  }
  
}

export default Listesports;