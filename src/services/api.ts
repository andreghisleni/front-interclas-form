import axios from "axios";
import { env } from "../../next.config.js";

const baseURL = (env as any).BASE_URL;

const api = axios.create({
  baseURL,
});

export { api };
