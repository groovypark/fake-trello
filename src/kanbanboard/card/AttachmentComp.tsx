import * as React from "react";
import {Attachment} from "../../type/Attachment";

export const AttachmentComp: React.FC<{ attachment: Attachment }> = ({attachment}) => {
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