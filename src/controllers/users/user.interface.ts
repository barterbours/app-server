import { Document } from "mongoose";

export interface UserInterface extends Document {
  readonly email: string;
  readonly passwordHash: string;
  readonly session: string;

  readonly includeInMatching: boolean;
  readonly wants: Array<string>;
  readonly offers: Array<string>;
  readonly homePoint: { latitude: number; longitude: number };
  readonly radius: number;
  readonly matchesWithUsers: Array<string>;
  readonly mailBoxID: number;
}
