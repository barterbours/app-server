import { Controller, Post, Param } from "@nestjs/common";
import { UsersService } from "../users.service";
import { AuthorizationError } from "errors";

@Controller("api/v1/users/configuration")
export class UserConfigurationController {
  constructor(private readonly usersService: UsersService) {}

  @Post("radius")
  async setRadius(
    @Param("session") session: string,
    @Param("radius") radius: number
  ) {
    const user = await this.usersService.getUserBySession(session);
    if (!user) {
      return new AuthorizationError("Invalid session");
    }

    await this.usersService.updateUsersRadius(user.email, radius);

    return { error: false };
  }

  @Post("homePoint")
  async setHomePoint(
    @Param("session") session: string,
    @Param("homePoint") homePoint: { latitude: number; longitude: number }
  ) {
    const user = await this.usersService.getUserBySession(session);

    if (!user) {
      return new AuthorizationError("Invalid session ");
    }

    await this.usersService.updateUsersHomePoint(user.email, homePoint);
    await this.usersService.updateUserIncludeInMatching(user.email, true);

    return { error: false };
  }
}
