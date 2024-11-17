/**
 * A wrapper function to handle the result and error tuple from service functions.
 * It automatically checks for errors and provides a structured response.
 *
 * @param serviceFunction - The service function to wrap, which returns a tuple [result, error].
 * @returns - A promise that resolves with the result or an error response.
 */
export const serviceWrapper = <
  ServiceFunction extends (...args: any) => Promise<any>,
>(
  serviceFunction: ServiceFunction
): ((
  ...args: Parameters<ServiceFunction>
) => Promise<[Awaited<ReturnType<ServiceFunction>> | null, Error | null]>) => {
  return async (...args: any[]) => {
    try {
      const result = await serviceFunction(...args);
      return [result, null];
    } catch (e) {
      return [null, e];
    }
  };
};
