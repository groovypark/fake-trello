import * as React from "react";
import {AttachmentType} from "../../type/AttachmentType";
import {Link} from "react-router-dom";

export const Attachment: React.FC<{ attachment: AttachmentType }> = ({attachment}) => {
  if (attachment.type.includes("image")) {
    return (
      <div>
        <Link to={`/users/${attachment.user.userId}/dashboard`} className={"user-display-name"}>{attachment.user.displayName}</Link>
        : <img src={attachment.url} alt="" width={100}/>
      </div>
    )
  }
  return (
    <div>
      <Link to={`/users/${attachment.user.userId}/dashboard`} className={"user-display-name"}>{attachment.user.displayName}</Link>
      : <a href={attachment.url} download={true} target={"_blank"}>download url</a>
    </div>
  )
}