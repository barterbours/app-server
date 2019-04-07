import { Controller, Post, Get, Headers, Body, Param } from "@nestjs/common";
import { UsersService } from "../users.service";
import { AddUserOfferingsDto } from "../offerings/user.add.offerings.dto";
import { AuthorizationError, PayloadError } from "errors";

@Controller("api/v1/users/wantings")
export class UserWantingsController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async add(
    @Headers("session") session: string,
    @Body() addWantingDto: AddUserOfferingsDto
  ) {
    const user = await this.usersService.getUserBySession(session);

    if (!user) {
      return new AuthorizationError("Invalid session");
    }

    await this.usersService.updateUsersWantings(
      user.email,
      addWantingDto.offeringsHashTags
    );

    return { error: false };
  }

  @Get()
  async get(@Param("email") email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return new PayloadError("User with the given mail does not exist");
    }

    return { error: false, wantings: user.wants };
  }
}
