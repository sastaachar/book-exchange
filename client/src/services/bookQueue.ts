import { serviceWrapper } from "@utils";
import { z } from "zod";
import {
  BookQueueSchema,
  GetBookQueueSchema,
  UpdateBookQueueSchema,
} from "@schemas";
import { Server } from "./common";
import { BookQueue } from "@appTypes";

// Create a new book queue
export const createBookQueue = serviceWrapper(
  async (args: z.infer<typeof BookQueueSchema>): Promise<BookQueue> => {
    const res = await Server.post({
      path: "/book-queue/create",
      params: args,
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson as BookQueue;
  }
);

// Get a specific book queue by its ID
export const getBookQueue = serviceWrapper(
  async (args: z.infer<typeof GetBookQueueSchema>): Promise<BookQueue> => {
    const res = await Server.get({
      path: `/book-queue/bookQueue/${args.bookQueueId}`,
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson as BookQueue;
  }
);

// Update a book queue by its ID
export const updateBookQueue = serviceWrapper(
  async (
    args: z.infer<typeof UpdateBookQueueSchema>,
    bookQueueId: number
  ): Promise<BookQueue> => {
    const res = await Server.post({
      path: `/api/bookQueue/${bookQueueId}/update`,
      params: args,
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson as BookQueue;
  }
);

// Fetch all book queues
export const getAllBookQueues = serviceWrapper(
  async (
    searchParam: Partial<z.infer<typeof BookQueueSchema>> & { userId?: number }
  ): Promise<BookQueue[]> => {
    const res = await Server.post({
      path: "/book-queue/search",
      params: searchParam,
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson as BookQueue[];
  }
);
