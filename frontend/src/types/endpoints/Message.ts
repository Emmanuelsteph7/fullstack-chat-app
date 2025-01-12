import { General } from "./General";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Message {
  export namespace GetMessageUsers {
    export interface Request {
      page: number;
      limit: number;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
        users: General.User[];
      };
    }
  }

  export namespace GetMessages {
    export interface Request {
      receiverId: string;
      page: number;
      limit: number;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
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
