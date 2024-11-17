import { prisma } from "@database";
import { BookQueue } from "@prisma/client";
import { BookQueueSchema } from "@schemas";
import { formatUnixToPostgresTimestamp, serviceWrapper } from "@utils";
import { z } from "zod";

/**
 * Creates a new BookQueue entry in the database.
 *
 * @param {Partial<z.infer<typeof BookQueueSchema>>} bookQueueParams - The parameters for the new BookQueue entry.
 * @returns {Promise<BookQueue>} - The newly created BookQueue entry.
 */
export const createBookQueue = serviceWrapper(
  async (
    bookQueueParams: z.infer<typeof BookQueueSchema> & { userId: number }
  ): Promise<BookQueue> => {
    const start = new Date(Date.now()).toISOString();
    const bookQueue = await prisma.bookQueue.create({
      data: { status: "pending", ...bookQueueParams, start },
    });
    return bookQueue;
  }
);

/**
 * Updates an existing BookQueue entry in the database.
 *
 * @param {number} bookQueueId - The ID of the BookQueue entry to update.
 * @param {Partial<z.infer<typeof BookQueueSchema>>} bookQueueParams - The updated parameters.
 * @returns {Promise<BookQueue>} - The updated BookQueue entry.
 */
export const updateBookQueue = serviceWrapper(
  async (
    bookQueueId: number,
    bookQueueParams: Partial<z.infer<typeof BookQueueSchema>>
  ): Promise<BookQueue> => {
    const updatedBookQueue = await prisma.bookQueue.update({
      where: { id: bookQueueId },
      data: bookQueueParams,
    });
    return updatedBookQueue;
  }
);

/**
 * Retrieves a BookQueue entry by its ID.
 *
 * @param {number} bookQueueId - The ID of the BookQueue entry to retrieve.
 * @returns {Promise<BookQueue | null>} - The retrieved BookQueue entry or null if not found.
 */
export const getBookQueue = serviceWrapper(
  async (bookQueueId: number): Promise<BookQueue | null> => {
    const bookQueue = await prisma.bookQueue.findUnique({
      where: { id: bookQueueId },
    });

    if (!bookQueue) {
      throw new Error("BookQueue entry not found");
    }

    return bookQueue;
  }
);

/**
 * Retrieves multiple BookQueue entry by its ID.
 *
 * @param {number} bookQueueId - The ID of the BookQueue entry to retrieve.
 * @returns {Promise<BookQueue | null>} - The retrieved BookQueue entry or null if not found.
 */
export const getMultipleBookQueue = serviceWrapper(
  async (
    bookQueueParams: Partial<z.infer<typeof BookQueueSchema>>
  ): Promise<BookQueue[]> => {
    const bookQueues = await prisma.bookQueue.findMany({
      where: {
        AND: [
          {
            bookAuthor: {
              startsWith: bookQueueParams.bookAuthor || "",
            },
          },
          {
            bookName: {
              startsWith: bookQueueParams.bookName || "",
            },
          },
        ],
      },
    });

    if (!bookQueues) {
      throw new Error("BookQueue entry not found");
    }

    return bookQueues;
  }
);
