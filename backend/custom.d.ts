import * as express from "express";
import { Express } from "express-serve-static-core";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}
