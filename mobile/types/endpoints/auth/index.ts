import { General } from "../general";

export namespace Auth {
  export namespace SignUp {
    export interface Request {
      name: string;
      email: string;
      password: string;
    }

    export type Response = General.SuccessResponse;
  }

  export namespace VerifyOtp {
    export interface Request {
      email: string;
      otp: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.LoginSuccess;
    }
  }

  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.LoginSuccess;
    }
  }

  export namespace ForgotPassword {
    export interface Request {
      email: string;
      type: "mobile";
    }

    export type Response = General.SuccessResponse;
  }

  export namespace ResetPassword {
    export interface Request {
      password: string;
      token: string;
    }

    export type Response = General.SuccessResponse;
  }

  export namespace ResetPasswordOtp {
    export interface Request {
      password: string;
      email: string;
    }

    export type Response = General.SuccessResponse;
  }

  export namespace VerifyForgotPasswordOtp {
    export interface Request {
      email: string;
      otp: string;
    }

    export type Response = General.SuccessResponse;
  }

  export namespace Logout {
    export type Response = General.SuccessResponse;
  }
}
