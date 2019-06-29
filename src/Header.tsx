import React, {useState} from "react";
import "./dashboard/Dashboard.css"
import logoGray from "./fake-trello-logo-gray.png";
import logoWhite from "./fake-trello-logo-white.png";
import {signOut} from "./signin/signout";
import {RouteComponentProps, withRouter} from "react-router";
import Session from "./session/Session";

const Header = (props: RouteComponentProps) => {
  const { history } = props;


  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownHidden(!isDropdownHidden)
  };

  return (
    <div>
    <div className="header">
      <a><img className="logo"
              src={logoGray}
              onMouseOver={e => (e.currentTarget.src = logoWhite)}
              onMouseOut={e => (e.currentTarget.src = logoGray)}
              alt="fake-trello-logo"
      /></a>
      {!!Session.user ? (
        <span>
            {!!Session.user.pictureUrl ? (
              <img className="profile"
                   src={Session.user.pictureUrl}
                   alt="" width={30}
                   onClick={toggleDropdown}
              />
            ) : null}
          </span>
      ) : null}
    </div>

  {isDropdownHidden ? null : (
    <div>
      {!!Session.user ? (
        <div className="profile-dropdown">
          <div className="dropdown-content">{Session.user.displayName}</div>
          <div className="dropdown-content signout"><span onClick={() => signOut(history)}>Sign Out</span></div>
        </div>
      ) : null}
    </div>
  )}
    </div>
  )
};


export default withRouter(Header);