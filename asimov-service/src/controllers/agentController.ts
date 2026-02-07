import { Request, Response } from 'express';
import { AgentService } from '../services/agentService';
import { AgentRepository } from '../repositories/agentRepository';

// Initialize dependencies (Dependency Injection could be used here)
const agentRepository = new AgentRepository();
const agentService = new AgentService(agentRepository);

export const searchAgents = async (req: Request, res: Response) => {
    try {
        const { query, top_k } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const results = await agentService.performSearch(query, top_k);

        return res.status(200).json({ data: results });
    } catch (error) {
        console.error('Error in searchAgents:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
