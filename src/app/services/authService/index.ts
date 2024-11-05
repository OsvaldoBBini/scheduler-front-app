import { signup } from "./signup";
import { signin } from "./signin";
import { confirmAccount } from "./confirmAccount";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";
import { refreshToken } from "./refreshToken";

export const authService = {
  signup,
  signin,
  refreshToken,
  confirmAccount,
  forgotPassword,
  resetPassword
}