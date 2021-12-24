import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';

const generateTemplate = ({
  iconText,
  header,
  subText,
  buttonText,
  btnLink,
}) => {
  return (
    <div className="error-container">
      <div className="error-view">
        <span className="error-icon">{iconText}</span>
        <div className="error-header">{header}</div>
        <div className="error-subtext">{subText}</div>
        {buttonText ? (
          <Link className="try-again" to={btnLink}>
            {buttonText}
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export const Error = () => {
  let options = {
    iconText: 'x',
    header: 'Error',
    subText: `Something went wrong! "Sed ut perspiciatis unde omnis iste natus error
  sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
    buttonText: 'Try again',
    btnLink: '/',
  };
  return generateTemplate({ ...options });
};

export const PageNotFound = () => {
  let options = {
    iconText: 'x',
    header: 'Page Not Found',
    subText: `Please check the url. "Sed ut perspiciatis unde omnis iste natus error
  sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
    buttonText: 'Go to Homepage',
    btnLink: '/',
  };
  return generateTemplate({ ...options });
};

export const duplicateObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
