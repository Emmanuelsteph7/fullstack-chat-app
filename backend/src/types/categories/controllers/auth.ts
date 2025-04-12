export namespace Auth {
  export namespace SignUp {
    export interface Request {
      name: string;
      email: string;
      password: string;
    }
  }

  export namespace VerifyOtp {
    export interface Request {
      email: string;
      otp: string;
    }
  }

  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }
  }
}
