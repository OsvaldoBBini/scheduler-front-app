import { signup } from "./signup";
import { signin } from "./signin";
import { confirmAccount } from "./confirmAccount";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";

export const authService = {
  signup,
  signin,
  confirmAccount,
  forgotPassword,
  resetPassword
}