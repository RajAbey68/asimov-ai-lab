export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_controls: {
        Row: {
          cobit_ref: string | null
          control_id: string
          control_type: string | null
          domain: string
          eu_annex: string | null
          eu_article: string | null
          evidence_required: string | null
          id: string
          iso_ref: string | null
          last_updated: string | null
          lifecycle_phase: string[] | null
          mapping_rationale: string | null
          nist_ref: string | null
          role_applicability: string[] | null
          specification: string | null
          threat_vector: string | null
          title: string | null
          validation_scale: string | null
        }
        Insert: {
          cobit_ref?: string | null
          control_id: string
          control_type?: string | null
          domain: string
          eu_annex?: string | null
          eu_article?: string | null
          evidence_required?: string | null
          id?: string
          iso_ref?: string | null
          last_updated?: string | null
          lifecycle_phase?: string[] | null
          mapping_rationale?: string | null
          nist_ref?: string | null
          role_applicability?: string[] | null
          specification?: string | null
          threat_vector?: string | null
          title?: string | null
          validation_scale?: string | null
        }
        Update: {
          cobit_ref?: string | null
          control_id?: string
          control_type?: string | null
          domain?: string
          eu_annex?: string | null
          eu_article?: string | null
          evidence_required?: string | null
          id?: string
          iso_ref?: string | null
          last_updated?: string | null
          lifecycle_phase?: string[] | null
          mapping_rationale?: string | null
          nist_ref?: string | null
          role_applicability?: string[] | null
          specification?: string | null
          threat_vector?: string | null
          title?: string | null
          validation_scale?: string | null
        }
        Relationships: []
      }
      assessment_evidence_files: {
        Row: {
          content_type: string | null
          created_at: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: number
          response_id: number
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: number
          response_id: number
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: number
          response_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessment_evidence_files_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "assessment_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_evidence_urls: {
        Row: {
          created_at: string | null
          id: number
          response_id: number
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          response_id: number
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          response_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_evidence_urls_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "assessment_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_responses: {
        Row: {
          ai_confidence_level: string | null
          ai_evaluation: string | null
          ai_insight: string | null
          ai_quality_score: number | null
          control_id: number
          created_at: string | null
          evaluation_status: string | null
          evidence_date: string | null
          evidence_notes: string | null
          evidence_text: string | null
          id: number
          response_score: number | null
          response_status: string
          session_id: string
          updated_at: string | null
        }
        Insert: {
          ai_confidence_level?: string | null
          ai_evaluation?: string | null
          ai_insight?: string | null
          ai_quality_score?: number | null
          control_id: number
          created_at?: string | null
          evaluation_status?: string | null
          evidence_date?: string | null
          evidence_notes?: string | null
          evidence_text?: string | null
          id?: number
          response_score?: number | null
          response_status: string
          session_id: string
          updated_at?: string | null
        }
        Update: {
          ai_confidence_level?: string | null
          ai_evaluation?: string | null
          ai_insight?: string | null
          ai_quality_score?: number | null
          control_id?: number
          created_at?: string | null
          evaluation_status?: string | null
          evidence_date?: string | null
          evidence_notes?: string | null
          evidence_text?: string | null
          id?: number
          response_score?: number | null
          response_status?: string
          session_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "governance_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sessions: {
        Row: {
          category_filter: string | null
          completed_at: string | null
          created_at: string | null
          framework_filter: string | null
          id: string
          region_id: number | null
          risk_level_filter: string | null
          sector_id: number | null
          session_name: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          framework_filter?: string | null
          id?: string
          region_id?: number | null
          risk_level_filter?: string | null
          sector_id?: number | null
          session_name: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          framework_filter?: string | null
          id?: string
          region_id?: number | null
          risk_level_filter?: string | null
          sector_id?: number | null
          session_name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_responses: {
        Row: {
          ai_confidence_level: string | null
          ai_evaluation: string | null
          ai_quality_score: number | null
          control_id: number
          created_at: string | null
          evaluation_status: string | null
          evidence: string | null
          evidence_date: string | null
          evidence_notes: string | null
          id: number
          response: string
          response_score: number | null
          session_id: string
          updated_at: string | null
        }
        Insert: {
          ai_confidence_level?: string | null
          ai_evaluation?: string | null
          ai_quality_score?: number | null
          control_id: number
          created_at?: string | null
          evaluation_status?: string | null
          evidence?: string | null
          evidence_date?: string | null
          evidence_notes?: string | null
          id?: number
          response: string
          response_score?: number | null
          session_id: string
          updated_at?: string | null
        }
        Update: {
          ai_confidence_level?: string | null
          ai_evaluation?: string | null
          ai_quality_score?: number | null
          control_id?: number
          created_at?: string | null
          evaluation_status?: string | null
          evidence?: string | null
          evidence_date?: string | null
          evidence_notes?: string | null
          id?: number
          response?: string
          response_score?: number | null
          session_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_responses_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audit_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_sessions: {
        Row: {
          category_filter: string | null
          completed_at: string | null
          created_at: string | null
          framework_filter: string | null
          id: string
          region_id: number | null
          risk_level_filter: string | null
          sector_id: number | null
          session_name: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          framework_filter?: string | null
          id?: string
          region_id?: number | null
          risk_level_filter?: string | null
          sector_id?: number | null
          session_name: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          framework_filter?: string | null
          id?: string
          region_id?: number | null
          risk_level_filter?: string | null
          sector_id?: number | null
          session_name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_sessions_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_sessions_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_requests: {
        Row: {
          company: string | null
          contact_method: string
          created_at: string
          email: string
          expert_name: string
          id: string
          message: string
          name: string
          phone: string
        }
        Insert: {
          company?: string | null
          contact_method: string
          created_at?: string
          email: string
          expert_name: string
          id?: string
          message: string
          name: string
          phone: string
        }
        Update: {
          company?: string | null
          contact_method?: string
          created_at?: string
          email?: string
          expert_name?: string
          id?: string
          message?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      controls: {
        Row: {
          asimov_pillar: string | null
          category: string
          control_name: string
          created_at: string | null
          description: string
          evidence: string
          framework: string
          id: number
          risk_level: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          asimov_pillar?: string | null
          category: string
          control_name: string
          created_at?: string | null
          description: string
          evidence: string
          framework?: string
          id?: number
          risk_level: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          asimov_pillar?: string | null
          category?: string
          control_name?: string
          created_at?: string | null
          description?: string
          evidence?: string
          framework?: string
          id?: number
          risk_level?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      evidence_files: {
        Row: {
          content_type: string | null
          created_at: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: number
          response_id: number
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: number
          response_id: number
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: number
          response_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "evidence_files_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "audit_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_urls: {
        Row: {
          created_at: string | null
          id: number
          response_id: number
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          response_id: number
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          response_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_urls_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "audit_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      governance_controls: {
        Row: {
          asimov_pillar: string | null
          category: string
          control_name: string
          created_at: string | null
          description: string
          evidence_requirements: string
          framework: string
          id: number
          regulatory_references: string | null
          risk_level: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          asimov_pillar?: string | null
          category: string
          control_name: string
          created_at?: string | null
          description: string
          evidence_requirements: string
          framework?: string
          id?: number
          regulatory_references?: string | null
          risk_level: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          asimov_pillar?: string | null
          category?: string
          control_name?: string
          created_at?: string | null
          description?: string
          evidence_requirements?: string
          framework?: string
          id?: number
          regulatory_references?: string | null
          risk_level?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hero_media: {
        Row: {
          created_at: string | null
          file_path: string
          id: number
          is_active: boolean | null
          media_type: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          id?: number
          is_active?: boolean | null
          media_type: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          id?: number
          is_active?: boolean | null
          media_type?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      implementation_roadmaps: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      roadmap_backlog_items: {
        Row: {
          assigned_to: string | null
          control_id: number | null
          created_at: string | null
          description: string | null
          effort_estimate: number | null
          id: string
          priority: string | null
          roadmap_id: string
          sprint_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          control_id?: number | null
          created_at?: string | null
          description?: string | null
          effort_estimate?: number | null
          id?: string
          priority?: string | null
          roadmap_id: string
          sprint_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          control_id?: number | null
          created_at?: string | null
          description?: string | null
          effort_estimate?: number | null
          id?: string
          priority?: string | null
          roadmap_id?: string
          sprint_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_backlog_items_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "governance_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmap_backlog_items_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "implementation_roadmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmap_backlog_items_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "roadmap_sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_sprints: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          roadmap_id: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          roadmap_id: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          roadmap_id?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_sprints_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "implementation_roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_links: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
          youtube_url: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
          youtube_url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
          youtube_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "viewer"],
    },
  },
} as const
