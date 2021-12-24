import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './ArticleDetails.css';

const ArticleDetails = (props) => {
  const getHTMLContent = (text) => {
    var e = document.createElement('div');
    e.innerHTML = text;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  };
  if (props.data) {
    let data = props.data.data;
    let imageUrl =
      data.preview && data.preview.images[0]
        ? data.preview.images[0].resolutions.find(
            (item) => item.width >= 300 && item.width <= 320
          ).url
        : null;
    console.log(imageUrl);
    return (
      <div className="article-container">
        <Link className="toHome button" to="/">
          Back to home
        </Link>
        {imageUrl ? (
          <div className="article-image">
            <img src={imageUrl.replace(/&amp;/g, '&')} />
          </div>
        ) : (
          ''
        )}
        <div className="article-details">
          <div className="article-title">
            <strong>Title:</strong>
            <span>{data.title}</span>
          </div>
          <div
            className="article-data"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <strong>Author:</strong>
            <span style={{ textTransform: 'capitalize' }}> {data.author} </span>
            <div className="info">
              <span>{data.num_comments} comments</span>
              <span>{`${data.upvote_ratio * 100}%`} upvoted</span>
            </div>
          </div>
          <div className="article-data">
            <strong>Content Categories: </strong>
            <span>{data.content_categories}</span>
          </div>
          <div className="article-data">
            <strong>Created on: </strong>
            <span>{moment(data.created).format('DD MMM, YYYY')}</span>
          </div>
          {data.selftext_html ? (
            <div className="article-data">
              <strong>Description</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: getHTMLContent(data.selftext_html),
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  } else {
    return <div className="loading"></div>;
  }
};

export default ArticleDetails;
