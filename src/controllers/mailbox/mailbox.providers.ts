import { Connection } from "mongoose";

import { MailboxSchema } from "./mailbox.schema";
import { MAILBOX_SCHEMA_PROVIDER, DB_PROVIDER } from "../../constants";

export const mailBoxesProviders = [
  {
    provide: MAILBOX_SCHEMA_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model("Mailbox", MailboxSchema),
    inject: [DB_PROVIDER]
  }
];
