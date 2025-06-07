export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ActiveProjects: {
        Row: {
          created_at: string
          guildId: string | null
          id: number
          pChannelId: string | null
          project_id: number | null
        }
        Insert: {
          created_at?: string
          guildId?: string | null
          id?: number
          pChannelId?: string | null
          project_id?: number | null
        }
        Update: {
          created_at?: string
          guildId?: string | null
          id?: number
          pChannelId?: string | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ActiveProjects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Milestones: {
        Row: {
          created_at: string
          description: string | null
          display_name: string | null
          due_date: string | null
          id: number
          milestone_ref: string | null
          project_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          due_date?: string | null
          id?: number
          milestone_ref?: string | null
          project_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          due_date?: string | null
          id?: number
          milestone_ref?: string | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Progress: {
        Row: {
          created_at: string
          desc: string | null
          id: number
          task_id: number | null
        }
        Insert: {
          created_at?: string
          desc?: string | null
          id?: number
          task_id?: number | null
        }
        Update: {
          created_at?: string
          desc?: string | null
          id?: number
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "Tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          completed: boolean | null
          created_at: string
          current_mid: number | null
          desc: string | null
          guild_id: string | null
          id: number
          output_channel: string | null
          pchannel_id: string | null
          sprint_enabled: boolean | null
          sprint_int: number | null
          sprint_msg: string | null
          sprint_n: number | null
          sprint_ping: boolean | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          current_mid?: number | null
          desc?: string | null
          guild_id?: string | null
          id?: number
          output_channel?: string | null
          pchannel_id?: string | null
          sprint_enabled?: boolean | null
          sprint_int?: number | null
          sprint_msg?: string | null
          sprint_n?: number | null
          sprint_ping?: boolean | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          current_mid?: number | null
          desc?: string | null
          guild_id?: string | null
          id?: number
          output_channel?: string | null
          pchannel_id?: string | null
          sprint_enabled?: boolean | null
          sprint_int?: number | null
          sprint_msg?: string | null
          sprint_n?: number | null
          sprint_ping?: boolean | null
        }
        Relationships: []
      }
      Roles: {
        Row: {
          created_at: string
          discord_id: string | null
          id: number
          project_id: number | null
          role_level: number | null
        }
        Insert: {
          created_at?: string
          discord_id?: string | null
          id?: number
          project_id?: number | null
          role_level?: number | null
        }
        Update: {
          created_at?: string
          discord_id?: string | null
          id?: number
          project_id?: number | null
          role_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Roles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Tasks: {
        Row: {
          assigned_id: string | null
          assigner_id: string | null
          created_at: string
          desc: string | null
          done: boolean | null
          due_date: string | null
          id: number
          milestone_id: number | null
          task_name: string | null
        }
        Insert: {
          assigned_id?: string | null
          assigner_id?: string | null
          created_at?: string
          desc?: string | null
          done?: boolean | null
          due_date?: string | null
          id?: number
          milestone_id?: number | null
          task_name?: string | null
        }
        Update: {
          assigned_id?: string | null
          assigner_id?: string | null
          created_at?: string
          desc?: string | null
          done?: boolean | null
          due_date?: string | null
          id?: number
          milestone_id?: number | null
          task_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Tasks_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "Milestones"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
