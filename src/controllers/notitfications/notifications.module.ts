import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { NotificationController } from "./notifications.controller";
import { usersProviders } from "controllers/users/users.providers";
import { UsersService } from "controllers/users/users.service";
import { notificationsProviders } from "./notifications.providers";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    ...usersProviders,
    UsersService,
    ...notificationsProviders,
    NotificationsService
  ]
})
export class NotificationModule {}
