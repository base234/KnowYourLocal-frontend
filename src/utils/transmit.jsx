import { Transmit } from "@adonisjs/transmit-client";

export const transmit = new Transmit({
  baseUrl: import.meta.env.VITE_APP_BACKEND_API,
  withCredentials: true
});
