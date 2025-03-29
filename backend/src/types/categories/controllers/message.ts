export namespace Message {
  export namespace GetMessageUsers {
    export interface Request {
      page?: number;
      limit?: number;
    }
  }

  export namespace GetMessages {
    export interface RequestParams {
      receiverId?: string;
    }

    export interface RequestQuery {
      page?: number;
      limit?: number;
    }
  }

  export namespace SendMessage {
    export interface RequestParams {
      receiverId?: string;
    }

    export interface RequestBody {
      text?: string;
      image?: string;
    }
  }

  export namespace AddMessageReaction {
    export interface RequestParams {
      messageId?: string;
    }

    export interface RequestBody {
      emoji?: string;
      receiverId?: string;
    }
  }
}
