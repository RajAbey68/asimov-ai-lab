import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import { searchAgents } from '../controllers/agentController';

const router = Router();

// Health Check
router.get('/healthz', healthCheck);

// API Routes
router.post('/v1/agents/search', searchAgents);

export default router;
