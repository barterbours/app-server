import { Controller, Post, Get, Headers, Body, Param } from "@nestjs/common";
import { UsersService } from "../users.service";
import { AddUserOfferingsDto } from "./user.add.offerings.dto";
import { AuthorizationError, PayloadError } from "errors";

@Controller("api/v1/users/offerings")
export class UserOfferingsController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addOffering(
    @Headers("session") session: string,
    @Body() addOfferingDto: AddUserOfferingsDto
  ) {
    const user = await this.usersService.getUserBySession(session);

    if (!user) {
      return new AuthorizationError("Invalid sesssion");
    }

    await this.usersService.updateUsersOfferings(
      user.email,
      addOfferingDto.offeringsHashTags
    );

    return { error: false };
  }

  @Get()
  async getOfferings(@Param("email") email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return new PayloadError("User with the given mail does not exist");
    }

    return { error: false, offerings: user.offers };
  }
}
