import { Module } from "@nestjs/common";
import { RegisterUsersController } from "./register.users.controller";
import { UsersService } from "../users.service";
import { usersProviders } from "../users.providers";
import { DatabaseModule } from "../../../database/database.module";
import { MailboxesService } from "controllers/mailbox/mailbox.service";
import { mailBoxesProviders } from "controllers/mailbox/mailbox.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterUsersController],
  providers: [
    UsersService,
    ...usersProviders,
    MailboxesService,
    ...mailBoxesProviders
  ]
})
export class RegisterUsersModule {}
