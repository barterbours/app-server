import { Controller, Get, Headers, Post, Body, Param } from "@nestjs/common";
import { MailboxesService } from "./mailbox.service";
import { UsersService } from "controllers/users/users.service";
import { SendMessageDto } from "./dtos/send.message.dto";
import { AuthorizationError, PayloadError } from "errors";
import { MessageInterface } from "./mailbox.interface";

@Controller("api/v1/mailbox")
export class MailboxController {
  constructor(
    private readonly mailboxesService: MailboxesService,
    private readonly usersService: UsersService
  ) {}

  @Get("/messages/get")
  async get(@Headers("session") session: string) {
    const user = await this.usersService.getUserBySession(session);

    if (!user) {
      return new AuthorizationError("Invalid session");
    }

    const mailbox = await this.mailboxesService.getByID(user.mailBoxID);

    const messages = mailbox.received;

    return { error: false, messages };
  }

  @Post("/messages/send")
  async message(
    @Headers("session") session: string,
    @Body() sendMessageDto: SendMessageDto
  ) {
    const user = await this.usersService.getUserBySession(session);
    if (!user) {
      return new AuthorizationError("Invalid session");
    }

    const receiver = await this.usersService.getUserByEmail(sendMessageDto.to);

    if (!receiver) {
      return new PayloadError("User with the given mail does not exists");
    }

    const message: MessageInterface = {
      from: user.email,
      to: receiver.email,
      timestamp: Date.now() / 1000,
      text: sendMessageDto.text,
      status: "unread",
      id: await this.mailboxesService.getLastSentMessageID(user.mailBoxID)
    };

    await this.mailboxesService.appendMessageToSent(user.mailBoxID, message);

    await this.mailboxesService.appendMessageToReceived(
      receiver.mailBoxID,
      message
    );

    return { error: false };
  }

  @Post("/message/status/set")
  async changeMessageStatus(
    @Headers("session") session: string,
    @Param("messageID") messageID: number,
    @Param("from") from: string,
    @Param("status") newStatus: "unread" | "starred"
  ) {
    const user = await this.usersService.getUserBySession(session);

    if (!user) {
      return new AuthorizationError("Invalid session");
    }

    try {
      await this.mailboxesService.changeMessageStatus(
        user.mailBoxID,
        messageID,
        from,
        newStatus
      );
    } catch (error) {
      return new PayloadError(error.message);
    }
    return { error: false };
  }
}
