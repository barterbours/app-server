import { Injectable, Inject } from "@nestjs/common";
import { MAILBOX_SCHEMA_PROVIDER } from "../../constants";
import { Model } from "mongoose";
import { MailBoxInterface, MessageInterface } from "./mailbox.interface";

@Injectable()
export class MailboxesService {
  constructor(
    @Inject(MAILBOX_SCHEMA_PROVIDER)
    private readonly mailboxModel: Model<MailBoxInterface>
  ) {}

  async create(): Promise<MailBoxInterface> {
    return await new this.mailboxModel({ id: await this.getLastID() }).save();
  }

  async getLastID(): Promise<number> {
    const boxes = await this.mailboxModel.find({});
    return boxes.length;
  }

  async getByID(id: number): Promise<MailBoxInterface> {
    return await this.mailboxModel.findOne({
      id
    });
  }

  async appendMessageToSent(id: number, message: MessageInterface) {
    await this.mailboxModel.findOneAndUpdate(
      {
        id
      },
      {
        $push: {
          sent: message
        }
      }
    );
  }

  async appendMessageToReceived(id: number, message: MessageInterface) {
    await this.mailboxModel.findOneAndUpdate(
      {
        id
      },
      {
        $push: {
          received: message
        }
      }
    );
  }

  async changeMessageStatus(
    id: number,
    messageID: number,
    receivedFrom: string,
    status: string
  ) {
    await this.mailboxModel.findByIdAndUpdate(
      {
        id,
        "received.id.from": receivedFrom,
        "received.id": messageID
      },
      {
        $set: { "received.$.status": status }
      }
    );
  }

  async getLastSentMessageID(id: number) {
    const mailbox = await this.getByID(id);
    if (!mailbox) {
      throw "Mailbox with the given id does not exist";
    }

    return mailbox.sent.length;
  }
}
