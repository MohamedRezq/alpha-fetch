import { Request } from "express";

export interface IAuthDecoded {
  username: string;
  organization_id: number;
}

export interface IAuthRequest extends Request {
  user?: IAuthDecoded;
}
