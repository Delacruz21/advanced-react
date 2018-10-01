import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';
if(typeof window !== 'undefined') {
    window.Perf = Perf;
}

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

class App extends PureComponent {
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
    appState = () => {
        const { articles, searchTerm } = this.props.store.getState();
        return { articles, searchTerm };
    }
    state = this.appState();
    onStoreChange = () => {
        this.setState(this.appState);
    }
    componentDidMount() {
        this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
        this.props.store.startClock();
        setImmediate(() => {
            Perf.start();
        });
        setTimeout(() => {
            Perf.stop();
            Perf.printWasted();
        },5000);
        
    }
    componentWillUnmount() {
        this.props.store.unsubscribe(this.subscriptionId);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.articles!==this.state.articles||nextState.searchTerm!==this.state.searchTerm;
    }
    render() {
        let { articles, searchTerm } =  this.state;
        const searchRE = new RegExp(searchTerm, 'i');
        if(searchTerm)
        {
            articles = pickBy(articles, (value) => {
                return value.title.match(searchRE) || value.body.match(searchRE);
            });
        }
        return (
            <div>
            <Timestamp />
            <SearchBar />
                <ArticleList
                    articles={articles}
                />
            </div>
            );
    }
};

export default App;