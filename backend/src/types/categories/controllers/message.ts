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
}
