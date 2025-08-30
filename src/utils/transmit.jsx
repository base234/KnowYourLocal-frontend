import { Transmit } from "@adonisjs/transmit-client";

export const transmit = new Transmit({
  baseUrl: import.meta.env.VITE_APP_BACKEND_API || "http://localhost:3333",
  withCredentials: true
});
