import { Controller, Get, Headers } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { UsersService } from "controllers/users/users.service";
import { AuthorizationError } from "errors";

@Controller("api/v1/notifications")
export class NotificationController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  async get(@Headers("session") session: string) {
    const user = await this.usersService.getUserBySession(session);
    if (!user) {
      return new AuthorizationError("invalid session");
    }

    const notifications = await this.notificationsService.getUserNotifications(
      user.email
    );

    return {
      error: false,
      notifications
    };
  }
}
