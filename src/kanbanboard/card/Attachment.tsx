import * as React from "react";
import {AttachmentType} from "../../type/AttachmentType";

export const Attachment: React.FC<{ attachment: AttachmentType }> = ({attachment}) => {
  if (attachment.type.includes("image")) {
    return (
      <div>
        {attachment.user.displayName}: <img src={attachment.url} alt="" width={100}/>
      </div>
    )
  }
  return (
    <div>
      {attachment.user.displayName}: <a href={attachment.url} download={true} target={"_blank"}>download url</a>
    </div>
  )
}