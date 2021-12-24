import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { duplicateObj } from './SupportFunctions';
import './ArticlesList.css';
let delay = null;
const ArticlesList = (props) => {
  const [state, setState] = useState({
    data: duplicateObj(props.data),
    searchTerm: '',
  });
  const searchFilter = useRef(null);
  const handleChange = (e) => {
    if (delay) {
      clearTimeout(delay);
    }
    delay = setTimeout(() => {
      let allData = duplicateObj(props.data);
      let searchTerm = e.target.value;
      if (searchTerm) {
        let data = allData.filter((item) => {
          let pattern = new RegExp(searchTerm, 'i');
          let title = item.data.title;
          let matchedWords = title.match(pattern);
          if (matchedWords && matchedWords.length) {
            matchedWords.forEach((word) => {
              title = title.replace(
                word,
                `<span class="highlight">${word}</span>`
              );
            });
            item.data['matchedTitle'] = title;
            return item;
          }
        });
        setState({
          data,
          searchTerm,
        });
      } else {
        resetFilter();
      }
    }, 500);
  };

  const resetFilter = () => {
    searchFilter.current.value = '';
    setState({
      data: duplicateObj(props.data),
      searchTerm: '',
    });
  };
  return (
    <div className="list-container">
      <h2 style={{ textAlign: 'center' }}>List of Articles</h2>
      <div className="filter">
        <input
          className="search-filter-input"
          placeholder="Search for title here..."
          ref={searchFilter}
          onChange={handleChange}
        />
        <button className="clear-button button" onClick={resetFilter}>
          Clear
        </button>
      </div>
      {state.data && state.data.length ? (
        <div className="thumbnails">
          {state.data.map((item) => (
            <Link
              to={`/article/${item.data.id}`}
              className="thumbnail-each"
              key={`${item.data.id}_article_item`}
            >
              {item.data.thumbnail.includes('https://') ? (
                <img
                  src={item.data.thumbnail}
                  alt="article"
                  style={{ width: '216px' }}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}

              {item.data.matchedTitle ? (
                <div
                  className="article-title"
                  dangerouslySetInnerHTML={{
                    __html: item.data.matchedTitle,
                  }}
                />
              ) : (
                <div className="article-title">{item.data.title}</div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-data">No data</div>
      )}
    </div>
  );
};

export default ArticlesList;
