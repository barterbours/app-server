import { Injectable, Inject } from "@nestjs/common";
import { NOTIFICATION_SCHEMA_PROVIDER } from "../../constants";
import { Model } from "mongoose";
import { NotificationInterface } from "./notification.interface";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_SCHEMA_PROVIDER)
    private readonly notificationsModel: Model<NotificationInterface>
  ) {}

  async create(notificationSchema: {
    notificationGoesTo: [string, string];
    id: number;
    commonTags: Array<string>;
  }) {
    await new this.notificationsModel({ notificationSchema }).save();
  }

  async getUserNotifications(user: string): Promise<NotificationInterface[]> {
    return await this.notificationsModel.find({
      notificationGoesTo: { $elemMatch: user }
    });
  }
}
