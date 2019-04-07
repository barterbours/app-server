import { Module } from "@nestjs/common";
import { MailboxController } from "./mailbox.controller";
import { DatabaseModule } from "database/database.module";
import { usersProviders } from "controllers/users/users.providers";
import { UsersService } from "controllers/users/users.service";
import { mailBoxesProviders } from "./mailbox.providers";
import { MailboxesService } from "./mailbox.service";

@Module({
  imports: [DatabaseModule],
  controllers: [MailboxController],
  providers: [
    ...usersProviders,
    UsersService,
    ...mailBoxesProviders,
    MailboxesService
  ]
})
export class MailboxesModule {}
