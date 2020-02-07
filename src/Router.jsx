import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomePage from './container/HomePage';
import SignUp from './container/Login/SignUp/SignUp';
import JaraApp from './JaraApp';

/**
 * This component is the main container for the Portal UI.
 *
 * @export
 * @class App
 * @extends {Component}
 */
class Router extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/loginPage' render={()=>(<JaraApp/>)}/>
        <Route exact path="/homePage" render={() => ((<HomePage />))} />
        <Route exact path="/signUp" render={() => ((<SignUp />))} /> 
        <Redirect from="/" to="/loginPage" />
      </Switch>
    );
  }
}

/**
 * mapStateToPops - maps the store state to the component props
 */

/**
 * connect() method connects component to redux store
 */
export default withRouter(connect("", {}, null, { pure: false })(Router));