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
   /* async componentDidMount() {
        const resp = await axios.get('/data');
        const api = new DataApi(resp.data);
        
        this.setState(() => ({
            articles: api.getArticles(),
            authors: api.getAuthors(),
        }));
    }*/
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