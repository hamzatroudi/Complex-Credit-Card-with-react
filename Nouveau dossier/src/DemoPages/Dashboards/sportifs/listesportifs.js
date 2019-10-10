import React from 'react';
import { css } from 'emotion';
import Fab from '@material-ui/core/Fab';


import Datatable from 'react-bs-datatable';
import {
  Col,
  Row,
} from 'reactstrap';
import { getAllSportifs, blockSportif } from '../service';



class Listesportifs extends React.Component {


  constructor(props) {
    super(props);
    this.state = { listsportifs: [] };
    console.log(props)
  }

  

  generateDataTable=(data)=> {
    const getSportifs=this.getSportifs
    var active =<p style={{color:'green'}}>Active</p>
    var blocked=<p style={{color:'red'}}>Locked</p>
    const sportifsAll = data.map(function (item) {
      return {
        username: item.user.username,
        adresse: item.adress,
        telephone: item.telephone,
        email: item.user.email,
        status: item.status ? active  : blocked,
        height: item.height,
        weight: item.weight,

        iconeedit:

          <Fab

            aria-label="edit"
            href={(`#/dashboards/sportifs/edit/${item.id}`)}
   /* onClick={()=>{ const history = createBrowserHistory();
     history.push(`#/dashboards/sportifs/edit/${item.user.id}`)}}*/>
            <i className="fas fa-pen"></i>

          </Fab>
        ,

      /*  iconkey: <Fab
          aria-label="edit"
          onClick="">
          <i className="fas fa-key"></i>
        </Fab>,*/

        iconblock: <Fab
          aria-label="edit"
          
          onClick={async () => {
            const res=await  blockSportif(item.id)
             getSportifs()

          
          }} >


<i className={item.status?"fas fa-ban":"fas fa-unlock-alt"}></i>
               
        </Fab>

      };

    });
    this.setState({ listsportifs: sportifsAll });


  }





  getSportifs=()=> {
    getAllSportifs().then((results) => {
      this.generateDataTable(results.data)
    })
  }




  componentWillMount() {
    this.getSportifs()



  }


  render() {




    const header = [
      {
        title: 'Username ',
        prop: 'username',
        sortable: true,
        filterable: true
      },
      { title: 'Email', prop: 'email', sortable: true },
      {
        title: 'Adresse',
        prop: 'adresse',
        sortable: true

      },
      { title: 'Telephone', prop: 'telephone', sortable: true },

      { title: 'Status', prop: 'status' },
      { title: 'Height', prop: 'height', sortable: true },
      { title: 'Weight', prop: 'weight', sortable: true },
      { title: '', prop: 'iconeedit' },
      { title: '', prop: 'iconkey' },
      { title: '', prop: 'iconblock' },


    ];

    const body = this.state.listsportifs

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
            background: #ed6736;
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
            tableBody={body}
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

export default Listesportifs;