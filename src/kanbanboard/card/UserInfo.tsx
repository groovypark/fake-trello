import * as React from "react";
import {UserType} from "../../type/UserType";
import {Link} from "react-router-dom";

export const UserInfo: React.FC<{ user: UserType }> = ({user}) => {
  return (
    <div className="card-detail-user">
      작성자: <Link to={`/users/${user.userId}/dashboard`} className={"user-display-name"}>{user.displayName}</Link>
    </div>
  )
};