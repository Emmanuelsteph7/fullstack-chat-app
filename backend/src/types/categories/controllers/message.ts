export namespace Message {
  export namespace GetMessages {
    export interface Request {
      receiverId?: string;
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
