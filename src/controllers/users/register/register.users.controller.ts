import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserDto } from "./register.user.dto";
import { UsersService } from "../users.service";
import * as randomstring from "randomstring";
import { SHA256 } from "sha2";
import { MailboxesService } from "controllers/mailbox/mailbox.service";

@Controller("api/v1/users/register")
export class RegisterUsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailboxesService: MailboxesService
  ) {}

  @Post()
  async create(@Body() RegisterUserDto: RegisterUserDto) {
    try {
      const mailBox = await this.mailboxesService.create();
      await this.usersService.create(RegisterUserDto, mailBox.id);
    } catch (error) {
      console.log(error);
      return { error: true, code: 111 };
    }
    let session = SHA256(randomstring.generate()).toString("hex");
    await this.usersService.updateUsersSession(RegisterUserDto.email, session);
    return { error: false, session: session };
  }
}
