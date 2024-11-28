import { Request } from "express";
import { Models } from "..";

export namespace General {
  export interface ExtendedRequest extends Request {
    user?: Models.User.UserModel;
  }
}
