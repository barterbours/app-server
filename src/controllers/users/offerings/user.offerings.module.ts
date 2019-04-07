import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { UserOfferingsController } from "./user.offerings.controller";
import { usersProviders } from "../users.providers";
import { UsersService } from "../users.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserOfferingsController],
  providers: [...usersProviders, UsersService]
})
export class UserOfferingsModule {}
