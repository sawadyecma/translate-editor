const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://my_deployment.server.com";
