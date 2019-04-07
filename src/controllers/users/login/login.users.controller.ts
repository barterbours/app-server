import { Controller, Post, Body } from "@nestjs/common";
import { UserLoginDto } from "./login.users.dto";
import { UsersService } from "../users.service";
import * as randomstring from "randomstring";
import { SHA256 } from "sha2";

@Controller("api/v1/user/login")
export class LoginUsersController {
  constructor(private readonly loginUsersService: UsersService) {}

  @Post()
  async auth(@Body() userLoginDto: UserLoginDto) {
    const givenPasswordHash: string = userLoginDto.password;
    const user: any = await this.loginUsersService.getUserByEmail(
      userLoginDto.email
    );
    if (user === null) {
      return { error: true, code: 101 };
    }

    if (givenPasswordHash !== user.password) {
      return { error: true, code: 102 };
    }

    let session = SHA256(randomstring.generate()).toString("hex");
    await this.loginUsersService.updateUsersSession(user.email, session);
    return { error: false, session: session };
  }
}
