import { General } from "./General";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Auth {
  export namespace SignUp {
    export interface Request {
      name: string;
      email: string;
      password: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        user: General.User;
        token: string;
      };
    }
  }

  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        user: General.User;
        token: string;
      };
    }
  }

  export namespace Logout {
    export type Response = General.SuccessResponse;
  }
}
