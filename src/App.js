import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Error, PageNotFound } from './SupportFunctions';
import ArticlesList from './ArticlesList';
import ArticleDetails from './ArticleDetails';
import './style.css';

const App = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    idMapping: null,
    data: null,
  });

  const processData = (data) => {
    let idMapping = {};
    data.children.forEach((item) => {
      idMapping[item.data.id] = item;
      setState({
        data,
        idMapping,
        error: false,
        isLoading: false,
      });
    });
  };

  useEffect(() => {
    window
      .fetch('https://www.reddit.com/r/pics/.json?jsonp=', {
        method: 'GET',
      })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw 'something went wrong';
        }
      })
      .then((response) => {
        processData(response.data);
      })
      .catch((error) => {
        setState({ isLoading: false, error: true });
      });
  }, []);

  const GetArticle = () => {
    let params = useParams();
    return <ArticleDetails data={state.idMapping[params.id]} />;
  };

  const getContent = () => {
    let content = '';
    if (state.error) {
      content = <Error />;
    } else if (state.isLoading) {
      content = <div className="loading"></div>;
    } else {
      content = (
        <Routes>
          <Route
            path="/"
            element={<ArticlesList data={state.data.children} />}
          />
          <Route exact path="/article/:id" element={<GetArticle />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      );
    }
    return content;
  };

  return getContent();
};

export default App;
