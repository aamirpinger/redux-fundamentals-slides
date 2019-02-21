import React, { Component } from 'react';
import Task from './Task';
import Movies from './Movies';
import { connect } from 'react-redux';

import { fetchInitialData } from '../actions/actions'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchInitialData())
  }

  render() {

    if(this.props.Loading) {
      return <h1>Loading</h1>
    }

    return (
      <div className="App">
        <Task />
        <Movies />

      </div>
    );
  }
}

export default connect(state => ({Loading: state.Loading}))(App);

