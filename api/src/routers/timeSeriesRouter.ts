import { Router } from "express";
import { getTimeSeriesData } from "../controllers/timeSeriesController";

const router = Router();

router
    .get('/', getTimeSeriesData);

export default router; 