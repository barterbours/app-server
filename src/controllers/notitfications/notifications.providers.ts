import { Connection } from "mongoose";

import { NotificationSchema } from "./notification.schema";
import { NOTIFICATION_SCHEMA_PROVIDER, DB_PROVIDER } from "../../constants";

export const notificationsProviders = [
  {
    provide: NOTIFICATION_SCHEMA_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model("Notification", NotificationSchema),
    inject: [DB_PROVIDER]
  }
];
