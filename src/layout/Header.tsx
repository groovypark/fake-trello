import React, {useState} from "react";
import "./Header.css"
import logoGray from "../fake-trello-logo-gray.png";
import logoWhite from "../fake-trello-logo-white.png";
import {signOut} from "../signin/signout";
import {RouteComponentProps, withRouter} from "react-router";
import Session from "../session/Session";
import {Link} from "react-router-dom";

const Header = (props: RouteComponentProps) => {
  const { history } = props;


  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownHidden(!isDropdownHidden)
  };

  return (
    <div>
    <div className="header">
      <Link to="/">
        <img className="logo"
                src={logoGray}
                onMouseOver={e => (e.currentTarget.src = logoWhite)}
                onMouseOut={e => (e.currentTarget.src = logoGray)}
                alt="fake-trello-logo"
        />
      </Link>
      {!!Session.user ? (
        <span>
            {!!Session.user.pictureUrl ? (
              <img className="profile"
                   src={Session.user.pictureUrl}
                   alt="" width={30}
                   onClick={toggleDropdown}
              />
            ) :
              <img
                className="profile"
                src="data:image/png;base64,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"
                alt="profile image"
              />
            }
          </span>
      ) : null}
    </div>

  {isDropdownHidden ? null : (
    <div>
      {!!Session.user ? (
        <div className="profile-dropdown">
          <Link to={`/users/${Session.user.userId}/dashboard`}
                style={{textDecoration: "none"}}
          >
            <div className="dropdown-content">
              {Session.user.displayName}
            </div>
          </Link>
          <div className="dropdown-content">
            <span onClick={() => signOut(history)}>Sign Out</span>
          </div>
        </div>
      ) : null}
    </div>
  )}
    </div>
  )
};


export default withRouter(Header);