import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';

class App extends Component {
    // define context types
    static childContextTypes = {
        store: PropTypes.object,
    }
    // setup context api
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    
    state = this.props.store.getState();
 
    render() {
        const { articles } =  this.state;
        return (
            <ArticleList
                articles={articles}
                store={this.props.store}
            />
            );
    }
};

export default App;