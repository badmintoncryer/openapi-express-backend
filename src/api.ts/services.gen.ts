// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-fetch";
import type { GetError, GetResponse } from "./types.gen";

export const client = createClient(createConfig());

/**
 * Returns a test message
 */
export const get = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetResponse, GetError, ThrowOnError>({
    ...options,
    url: "/",
  });
};
