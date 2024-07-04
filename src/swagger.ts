import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Follower System API",
    version: "1.0.0",
    description:
      "This is a simple API for a follower system implemented with Express.js, TypeScript, Prisma, and SQLite.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
