import { AgentRepository, SearchResult } from '../repositories/agentRepository';

export class AgentService {
    private agentRepository: AgentRepository;

    constructor(agentRepository: AgentRepository) {
        this.agentRepository = agentRepository;
    }

    async performSearch(query: string, topK: number = 5): Promise<SearchResult[]> {
        // Business logic goes here (e.g., logging, data transformation, caching)
        console.log(`[Service] Processing search request for: "${query}"`);

        return this.agentRepository.searchVectors(query, topK);
    }
}
