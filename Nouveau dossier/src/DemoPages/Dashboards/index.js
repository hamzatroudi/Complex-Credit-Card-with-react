import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS

import BasicDashboard from './Basic/';
import Addsportif from './sportifs/addsportifs';
import Listesportifs from './sportifs/listesportifs';
import Listecoachs from './coachs/listecoachs';
import AddCoach from './coachs/addcoach';
import Editcoachs from './coachs/editcoach';
import CoachDetail from './coachs/coachdetaille';
import Editsportif from './sportifs/editsportifs';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import Listesports from './categories/listedessports';
import Addsport from './categories/addsport';
import About from './about/about';


const Dashboards = ({ match }) => 
   { console.log(match.url);
   return  <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/basic`} component={BasicDashboard} />
                    <Route path={`${match.url}/sportifs/liste`} component={Listesportifs} />
                    <Route path={`${match.url}/sportifs/ajout`} component={Addsportif} />
                    <Route path={`/dashboards/sportifs/edit/:id`}  render={(passProps)=><Editsportif {...passProps}/>} />
                    <Route path={`${match.url}/sports/liste`} component={Listesports} />
                    <Route path={`${match.url}/sports/ajout`} component={Addsport} />
                    <Route path={`${match.url}/coachs/liste`} component={Listecoachs} />
                    <Route path={`${match.url}/coachs/ajout`} component={AddCoach} />
                    <Route path={`/dashboards/coachs/edit/:id`}  render={(passProps)=><Editcoachs {...passProps}/>} />
                    <Route path={`/dashboards/coachs/details/:id`}  render={(passProps)=><CoachDetail {...passProps}/>} />
                    <Route path={`${match.url}/About`} component={About} />

                 </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>}


export default Dashboards;