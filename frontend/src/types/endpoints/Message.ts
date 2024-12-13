import { General } from "./General";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Message {
  export namespace GetMessageUsers {
    export interface Response extends General.SuccessResponse {
      data: {
        users: General.User[];
      };
    }
  }

  export namespace GetMessages {
    export interface Request {
      receiverId: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        messages: General.Message[];
      };
    }
  }

  export namespace SendMessage {
    export interface Request {
      receiverId: string;
      image?: string;
      text?: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        message: General.Message;
      };
    }
  }
}
