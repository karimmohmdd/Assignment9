import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../config/config.js";
import { BadRequestException } from "../../common/exceptions/app.exceptions.js";
import { createLoginTokens } from "../../common/security/token.security.js";

export async function rotateToken(payload) {
  const tokenExpiryDate = payload.iat + JWT_ACCESS_EXPIRES_IN;
  const currentDate = Date.now() / 1000;

  if (tokenExpiryDate > currentDate) {
    throw BadRequestException({ errMsg: "Old Token Still Valid" });
  }

  return createLoginTokens({
    payload: { sub: payload.sub },
    refreshExpiresIn:
      JWT_REFRESH_EXPIRES_IN - (Math.ceil(Date.now() / 1000) - payload.iat),
  });
}
