import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";

import { UserInterface } from "./user.interface";
import { RegisterUserDto } from "./register/register.user.dto";
import { USER_SCHEMA_PROVIDER } from "../../constants";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_SCHEMA_PROVIDER)
    private readonly userModel: Model<UserInterface>
  ) {}

  async create(
    registerUserDto: RegisterUserDto,
    mailBoxID: number
  ): Promise<UserInterface> {
    const createdUser = new this.userModel({ ...registerUserDto, mailBoxID });
    const alreadyExistingUser = await this.getUserByEmail(
      registerUserDto.email
    );

    if (alreadyExistingUser !== null) {
      throw new Error("User with this email already exists");
    }

    return await createdUser.save();
  }
  async getUserByEmail(email: string): Promise<UserInterface> {
    return await this.userModel.findOne({ email });
  }

  async getUsersToMatch(): Promise<UserInterface[]> {
    return this.userModel.find({ includeInMatching: true });
  }

  async getUserBySession(session: string): Promise<UserInterface> {
    return await this.userModel.findOne({ session });
  }

  async updateUsersSession(email: string, newSession: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { email },
      {
        $set: { session: newSession }
      }
    );
  }

  async updateUsersOfferings(email: string, offerings: Array<string>) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw "Invalid user";
    }
    for (let i = 0; i < offerings.length; i++) {
      await this.userModel.findOneAndUpdate(
        {
          email
        },
        {
          $push: {
            offers: offerings[i]
          }
        }
      );
    }
  }

  async updateUsersWantings(email: string, wantings: Array<string>) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw "Invalid user";
    }
    for (let i = 0; i < wantings.length; i++) {
      await this.userModel.findOneAndUpdate(
        {
          email
        },
        {
          $push: {
            wants: wantings[i]
          }
        }
      );
    }
  }

  async updateUsersRadius(email: string, radius: number) {
    await this.userModel.findOneAndUpdate(
      {
        email
      },
      {
        $set: { radius }
      }
    );
  }

  async updateUsersHomePoint(
    email: string,
    homePoint: { latitude: number; longitude: number }
  ) {
    await this.userModel.findOneAndUpdate(
      {
        email
      },
      {
        $set: { homePoint }
      }
    );
  }

  async updateUserIncludeInMatching(email: string, include: boolean) {
    await this.userModel.findOneAndUpdate(
      {
        email
      },
      {
        $set: { includeInMatching: include }
      }
    );
  }
}
