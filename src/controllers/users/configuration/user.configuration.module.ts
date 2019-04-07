import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { UserConfigurationController } from "./user.configuration.controller";
import { usersProviders } from "../users.providers";
import { UsersService } from "../users.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserConfigurationController],
  providers: [...usersProviders, UsersService]
})
export class UserConfigurationModule {}
