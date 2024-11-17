/**
 * A wrapper function to handle the result and error tuple from service functions.
 * It automatically checks for errors and provides a structured response.
 *
 * @param serviceFunction - The service function to wrap, which returns a tuple [result, error].
 * @returns - A promise that resolves with the result or an error response.
 */
export const serviceWrapper = <
  ServiceFunction extends (...args: unknown[]) => Promise<unknown>
>(
  serviceFunction: ServiceFunction
): ((
  ...args: Parameters<ServiceFunction>
) => Promise<
  [
    Awaited<ReturnType<ServiceFunction>> | null,
    { message: string; status: number } | null
  ]
>) => {
  return async (...args) => {
    try {
      const result = (await serviceFunction(...args)) as Awaited<
        ReturnType<ServiceFunction>
      >;
      return [result, null];
    } catch (e) {
      return [null, { message: e.message, status: e.status }];
    }
  };
};
