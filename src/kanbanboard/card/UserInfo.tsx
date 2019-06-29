import * as React from "react";
import {User} from "../../type/User";

export const UserInfo: React.FC<{ user: User }> = ({user}) => {
  return (
    <div>
      user: {user.displayName}
    </div>
  )
};