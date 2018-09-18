import React from 'react';
import PropTypes from 'prop-types';

import Article from './Article';

const ArticleList = (props, {store}) => (
    <div>
        {Object.values(props.articles).map(article => 
            <Article 
                key={article.id}
                article={article}
            />
        )}
    </div>
);

ArticleList.propTypes = {
  articles: PropTypes.object.isRequired,
};

export default ArticleList;