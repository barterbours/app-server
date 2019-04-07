import { Document } from "mongoose";

export interface NotificationInterface extends Document {
  readonly notificationGoesTo: [string, string];
  readonly id: number;
  readonly timestamp: number;
  readonly commonTags: Array<string>;
}
