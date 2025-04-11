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
        unreadMessagesCount: number;
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

  export namespace AddMessageReaction {
    export interface Request {
      receiverId: string;
      messageId?: string;
      emoji?: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        message: General.Message;
      };
    }
  }

  export namespace DeleteMessage {
    export interface Request {
      messageId?: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        message: General.Message;
      };
    }
  }

  export namespace UndoMessageDelete {
    export interface Request {
      messageId?: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        message: General.Message;
      };
    }
  }

  export namespace EditMessage {
    export interface Request {
      receiverId: string;
      messageId?: string;
      text?: string;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        message: General.Message;
      };
    }
  }

  export namespace ForwardMessage {
    interface Messages {
      message: General.Message;
      receiverId: string;
    }

    export interface Request {
      messageId?: string;
      receiverIds: string[];
    }

    export interface Response extends General.SuccessResponse {
      data: {
        messages: Messages[];
      };
    }
  }
}
