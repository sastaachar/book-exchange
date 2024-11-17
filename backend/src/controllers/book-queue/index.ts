import Express from "express";
import { getLogger, requestValidatedHandler } from "@utils";
import { z } from "zod";
import {
  BookQueueSchema,
  GetBookQueueSchema,
  UpdateBookQueueSchema,
} from "@schemas";
import { bookQueueService } from "@services";

const createBookQueueRoute = requestValidatedHandler(
  {
    body: BookQueueSchema,
  },
  async (req, res) => {
    const logger = getLogger("bookQueue/createBookQueue");
    const [createdBookQueue, error] = await bookQueueService.createBookQueue(
      req.body
    );

    if (error || !createdBookQueue) {
      res.status(400).send({
        error,
      });
      return;
    }

    res.status(200).send(createdBookQueue);
    logger.log("Success, bookQueueId : ", createdBookQueue.id);
  }
);

const getBookQueueRoute = requestValidatedHandler(
  {
    params: GetBookQueueSchema,
  },
  async (req, res) => {
    const bookQueueId = Number(req.params.bookQueueId);
    const [bookQueue, error] = await bookQueueService.getBookQueue(bookQueueId);

    if (error || !bookQueue) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(bookQueue);
  }
);

const updateBookQueueRoute = requestValidatedHandler(
  {
    params: z.object({ bookQueueId: z.number() }),
    body: UpdateBookQueueSchema,
  },
  async (req, res) => {
    const bookQueueId = Number(req.params.bookQueueId);
    const [updatedBookQueue, error] = await bookQueueService.updateBookQueue(
      bookQueueId,
      req.body
    );

    if (error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(200).send(updatedBookQueue);
  }
);

export const getBookQueueRouter = () => {
  const bookQueueRouter = Express.Router();
  bookQueueRouter.post("/create", createBookQueueRoute);
  bookQueueRouter.get("/:bookQueueId", getBookQueueRoute);
  bookQueueRouter.put("/:bookQueueId/update", updateBookQueueRoute);

  return bookQueueRouter;
};
