import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { usersProviders } from "../users.providers";
import { UsersService } from "../users.service";
import { UserWantingsController } from "./user.wantings.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [UserWantingsController],
  providers: [...usersProviders, UsersService]
})
export class UserWantingsModule {}
