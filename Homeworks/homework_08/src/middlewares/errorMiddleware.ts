import logger from "../shared/Logger";
import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import HttpException from "../exceptions/HttpException";

const { BAD_REQUEST } = StatusCodes;

function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({ err: err.message})
}

export default errorMiddleware;
