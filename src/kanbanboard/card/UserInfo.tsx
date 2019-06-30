import * as React from "react";
import {UserType} from "../../type/UserType";

export const UserInfo: React.FC<{ user: UserType }> = ({user}) => {
  return (
    <div>
      user: {user.displayName}
    </div>
  )
};