import { Document } from "mongoose";

export interface MailBoxInterface extends Document {
  readonly id: number;
  readonly sent: Array<MessageInterface>;
  readonly received: Array<MessageInterface>;
}

export interface MessageInterface {
  readonly from: string;
  readonly to: string;
  readonly timestamp: number;
  readonly status: "read" | "unread" | "starred";
  readonly text: string;
  readonly id: number;
}
