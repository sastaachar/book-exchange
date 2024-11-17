import Express from "express";
import { getLogger, requestValidatedHandler } from "@utils";
import { z } from "zod";
import {
  BookQueueSchema,
  GetBookQueueSchema,
  SearchBookQueueSchema,
  UpdateBookQueueSchema,
} from "@schemas";
import { bookQueueService } from "@services";

const createBookQueueRoute = requestValidatedHandler(
  {
    body: BookQueueSchema,
  },
  async (req, res) => {
    if (!req.user?.id) throw { message: "Failed book queue creation" };

    const logger = getLogger("bookQueue/createBookQueue");
    const [createdBookQueue, error] = await bookQueueService.createBookQueue({
      ...req.body,
      userId: req.user.id,
    });

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

// Define the router
const getMultipleBookQueueRoute = requestValidatedHandler(
  {
    body: SearchBookQueueSchema, // We allow partial BookQueue parameters for flexible queries
  },
  async (req, res) => {
    const logger = getLogger("bookQueue/getMultipleBookQueue");

    try {
      // Call the service to get book queues based on the query parameters
      const [bookQueues, error] = await bookQueueService.getMultipleBookQueue(
        req.body
      );

      if (!bookQueues || error) {
        return res.status(500).send({
          error,
        });
      }

      res.status(200).send(bookQueues); // Return the list of book queues
    } catch (error) {
      logger.log("Error fetching book queues:", error);
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
);

export const getBookQueueRouter = () => {
  const bookQueueRouter = Express.Router();
  bookQueueRouter.post("/create", createBookQueueRoute);
  bookQueueRouter.get("/:bookQueueId", getBookQueueRoute);
  bookQueueRouter.post("/:bookQueueId/update", updateBookQueueRoute);
  bookQueueRouter.post("/search", getMultipleBookQueueRoute);
  return bookQueueRouter;
};
