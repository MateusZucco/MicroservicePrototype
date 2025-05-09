import { Request, Response, NextFunction } from "express";
export function verifyUserType(
  req: Request,
  res: Response,
  next: NextFunction,
  types: Array<string>
) {
  req.user = undefined;

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]
  ) {
    const typeHeader = req.headers["type"];

    if (types.some((type) => type === typeHeader)) {
      next();
    } else {
      res.status(403).send({
        message: "User type not authorized",
      });
    }
  } else {
    res.status(403).send({
      message: "User type not authorized",
    });
  }
}
