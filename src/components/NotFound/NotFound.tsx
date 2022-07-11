import React from "react";
import { Link } from "react-router-dom";

import { notFoundSettings } from "../../constants/constant";

import "./notFound.css";

class NotFound extends React.Component<{}, {}> {
  render(): JSX.Element {
    
    return (
      <div className="not-found-page">
        <h1 className="not-found-title">{notFoundSettings.title}</h1>
        <Link to={"/"}>
          <h2 className="back-to-main">{notFoundSettings.backToMain}</h2>
        </Link>
      </div>
    );
  }
}

export default NotFound;
