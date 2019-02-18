import React, { Component } from 'react';
import Task from './Task';
import Movies from './Movies';

class App extends Component {
  componentDidMount(){
    this.props.store.subscribe(() => this.forceUpdate())
  }
  render() {
    const {tasks, movies} = this.props.store.getState()
    return (
      <div className="App">
        <Task 
          tasks={tasks}
          dispatch={this.props.store.dispatch} 
          />
        <Movies 
          movies={movies}
          dispatch={this.props.store.dispatch} 
          />
      </div>
    );
  }
}

export default App;
