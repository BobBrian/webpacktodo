import React, { Component, Fragment } from 'react';
import InputTodo from './todo/InputTodo';
import ListTodos from './todo/ListTodos';

class App extends Component {

    render() {
        return (
            <Fragment>
                <div className="container">
                     <InputTodo/>
                     <ListTodos/>
                </div>
            </Fragment>
        )
    }
}

export default App;