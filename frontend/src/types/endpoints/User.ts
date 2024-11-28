/* eslint-disable @typescript-eslint/no-namespace */
import { General } from "./General";

export namespace User {
  export namespace GetProfile {
    export interface Response extends General.SuccessResponse {
      data: {
        user: General.User;
      };
    }
  }

  export namespace UploadPicture {
    export interface Request {
      profilePic: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        profilePic: {
          public_id: string;
          url: string;
        };
      };
    }
  }
}
