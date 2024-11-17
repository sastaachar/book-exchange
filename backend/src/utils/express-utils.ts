import { z } from "zod";
import Express from "express";
import { fromError } from "zod-validation-error";
import { getLogger } from "./logger";
import { SafeUser } from "@schemas";

const validateAndRespondOnFailure = (
  schema?: z.Schema,
  objectToVerify?: any,
  res?: Express.Response
) => {
  if (!schema || !res) return false;
  const parsedSchema = schema.safeParse(objectToVerify);
  if (!parsedSchema.success) {
    const validationError = fromError(parsedSchema.error);
    res.status(400).send(validationError.toString());
    return true;
  }
  return false;
};

export const errorBoundaryHandler = (
  reqHandler: Express.RequestHandler
): Express.RequestHandler => {
  const logger = getLogger("Error-Boundary");
  return async (req, res, next) => {
    try {
      await reqHandler(req, res, next);
    } catch (e) {
      logger.log(e.message);
    }
  };
};

type WithUserObject<T> = T & { user?: SafeUser };

/**
 * A middleware that validates the request parameters, query, and body against the provided Zod schemas.
 * If validation fails, an error response is sent. If validation succeeds, the request handler is called.
 * This middleware also wraps the handler with error boundary logic.
 *
 * @param {Object} schema - An object containing optional schemas for validating request `params`, `query`, and `body`.
 * @param {Express.RequestHandler} reqHandler - The route handler to be executed if validation passes.
 * @returns {Express.RequestHandler} A new middleware function that validates the request and calls the route handler.
 *
 * @example
 * const schema = { params: z.object({ id: z.string() }), body: z.object({ name: z.string() }) };
 * app.post('/users/:id', requestValidatedHandler(schema, myHandler));
 */
export const requestValidatedHandler = <ParamType, QueryType, RequestType>(
  schema: {
    params?: z.Schema<ParamType>;
    query?: z.Schema<QueryType>;
    body?: z.Schema<RequestType>;
  },
  reqHandler: Express.RequestHandler<ParamType, any, RequestType, QueryType>
): Express.RequestHandler => {
  return errorBoundaryHandler((req, res, next) => {
    // validate request here
    const paramParseError = validateAndRespondOnFailure(
      schema.params,
      req.params,
      res
    );
    if (paramParseError) return;

    const queryParseError = validateAndRespondOnFailure(
      schema.query,
      req.query,
      res
    );
    if (queryParseError) return;

    const bodyPraseError = validateAndRespondOnFailure(
      schema.body,
      req.body,
      res
    );
    if (bodyPraseError) return;

    return reqHandler(req as any, res, next);
  });
};
