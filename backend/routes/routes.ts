import express from "express";
import { authRoutes } from "@services/routes/auth.routes";
import { controllerRoutes } from "@services/routes/controller.routes";

export const routes = express.Router();

routes.use("/", controllerRoutes.redirect);
routes.use("/api/", controllerRoutes.shorten);
routes.use("/api/", controllerRoutes.analytics);
routes.use("/api/", controllerRoutes.links);
routes.use("/api/auth", authRoutes.login);
routes.use("/api/auth", authRoutes.register);
routes.use("/api/auth", authRoutes.me);
