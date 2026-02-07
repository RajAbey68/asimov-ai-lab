import { supabase } from '../config/database';

export interface SearchResult {
    id: string;
    context: string;
    score: number;
}

export class AgentRepository {
    async searchVectors(query: string, topK: number): Promise<SearchResult[]> {
        console.log(`[Repo] Searching for: "${query}" with topK: ${topK}`);

        // Assuming a 'documents' table with a 'embedding' column and a 'match_documents' RPC function
        // This is a standard pattern in Supabase for vector search
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: query, // In a real app, you'd generate embeddings here or pass them in
            match_threshold: 0.5,
            match_count: topK
        });

        if (error) {
            console.error('Supabase Error:', error);
            // Fallback for now since we might not have the RPC set up yet
            return [
                { id: '1', context: 'Mock result: Database connection established but RPC failed or missing.', score: 0.0 }
            ];
        }

        if (!data) return [];

        return data.map((item: any) => ({
            id: item.id,
            context: item.content,
            score: item.similarity
        }));
    }

    async getControl(id: number) {
        const { data, error } = await supabase
            .from('controls')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }
}
