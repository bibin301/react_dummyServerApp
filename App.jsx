import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
 import Signup from './src/user/Signup/Signup';

import Login from './src/user/Login/Login';
 import Dashboard from './src/user/Dashboard/Dashboad';


// import User from './User/User';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends React.Component {
      render() {
            return (
                  <Router>
                        <div>
                              <Switch>
                                    <Redirect exact path="/" to="/Login" />
                                    <Route exact path='/Signup' component={Signup} />
                                    <Route exact path='/Dashboard' component={Dashboard} />
                                    <Route exact path='/Login' component={Login} />
                                    {/* <Route exact path='/User' component={User} /> */}
                              </Switch>
                        </div>
                  </Router>
            );
      }
}
export default App;
