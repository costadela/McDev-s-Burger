import type { UserPayload } from "./user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}