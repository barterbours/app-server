import { UsersService } from "controllers/users/users.service";
import { NotificationsService } from "controllers/notitfications/notifications.service";
import { Worker } from "./worker.class";

import { getDistance } from "geolib";
import { UserInterface } from "controllers/users/user.interface";

export class MatchesWorker extends Worker {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    frequency: number
  ) {
    super(frequency);
  }

  async start() {
    super.start();

    while (true) {
      if (!this.isRunning) {
        break;
      }

      const allUsers = await this.usersService.getUsersToMatch();
    }
  }

  async stop() {
    super.stop();
  }

  private async countDistance(
    pointA: {
      latitude: number;
      longitude: number;
    },
    pointB: { latitude: number; longitude: number }
  ) {
    return await getDistance(pointA, pointB);
  }

  private async getCommonTags(userA: UserInterface, userB: UserInterface) {}
}
