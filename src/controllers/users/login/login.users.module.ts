import { Module } from "@nestjs/common";
import { LoginUsersController } from "./login.users.controller";
import { UsersService } from "../users.service";
import { usersProviders } from "../users.providers";
import { DatabaseModule } from "../../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [LoginUsersController],
  providers: [UsersService, ...usersProviders]
})
export class LoginUsersModule {}
