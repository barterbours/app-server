import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { RegisterUsersModule } from "./controllers/users/register/register.users.module";
import { LoginUsersModule } from "./controllers/users/login/login.users.module";
import { UserOfferingsModule } from "controllers/users/offerings/user.offerings.module";
import { UserWantingsModule } from "controllers/users/wantings/user.wantings.module";
import { MailboxesModule } from "controllers/mailbox/mailbox.module";
import { NotificationModule } from "controllers/notitfications/notifications.module";
import { UserConfigurationModule } from "controllers/users/configuration/user.configuration.module";

@Module({
  imports: [
    RegisterUsersModule,
    LoginUsersModule,
    UserOfferingsModule,
    UserWantingsModule,
    MailboxesModule,
    NotificationModule,
    UserConfigurationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
