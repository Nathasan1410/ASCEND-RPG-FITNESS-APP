export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          class: 'Novice' | 'Striker' | 'Tank' | 'Assassin' | null
          rank_tier: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank' | null
          level: number | null
          current_xp: number | null
          total_xp: number | null
          stats_strength: number | null
          stats_agility: number | null
          stats_stamina: number | null
          streak_current: number | null
          streak_best: number | null
          hunter_status: 'Normal' | 'Verified' | 'Flagged' | 'Corrupted' | null
          verified_at: string | null
          report_count: number | null
          onboarding_done: boolean | null
          height_cm: number | null
          weight_kg: number | null
          equipment: string[] | null
          last_activity_at: string | null
          created_at: string | null
          ab_testing_data: { experiments: any[] } | null
          variant_assignments: { [key: string]: string } | null
          subscription_tier: 'free' | 'pro' | 'max' | null
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          username?: string | null
          class?: 'Novice' | 'Striker' | 'Tank' | 'Assassin' | null
          rank_tier?: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank' | null
          level?: number | null
          current_xp?: number | null
          total_xp?: number | null
          stats_strength?: number | null
          stats_agility?: number | null
          stats_stamina?: number | null
          streak_current?: number | null
          streak_best?: number | null
          hunter_status?: 'Normal' | 'Verified' | 'Flagged' | 'Corrupted' | null
          verified_at?: string | null
          report_count?: number | null
          onboarding_done?: boolean | null
          height_cm?: number | null
          weight_kg?: number | null
          equipment?: string[] | null
          last_activity_at?: string | null
          created_at?: string | null
          ab_testing_data?: { experiments: any[] } | null
          variant_assignments?: { [key: string]: string } | null
          subscription_tier?: 'free' | 'pro' | 'max' | null
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          class?: 'Novice' | 'Striker' | 'Tank' | 'Assassin' | null
          rank_tier?: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank' | null
          level?: number | null
          current_xp?: number | null
          total_xp?: number | null
          stats_strength?: number | null
          stats_agility?: number | null
          stats_stamina?: number | null
          streak_current?: number | null
          streak_best?: number | null
          hunter_status?: 'Normal' | 'Verified' | 'Flagged' | 'Corrupted' | null
          verified_at?: string | null
          report_count?: number | null
          onboarding_done?: boolean | null
          height_cm?: number | null
          weight_kg?: number | null
          equipment?: string[] | null
          last_activity_at?: string | null
          created_at?: string | null
          ab_testing_data?: { experiments: any[] } | null
          variant_assignments?: { [key: string]: string } | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          id: string
          user_id: string
          quest_type: 'Daily' | 'Special' | 'Penalty' | 'RankUp' | null
          rank_difficulty: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          plan_json: Json
          xp_potential: number
          status: 'Active' | 'Completed' | 'Failed' | 'Skipped' | 'Pending_Verification' | null
          requires_proof: boolean | null
          expires_at: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          quest_type?: 'Daily' | 'Special' | 'Penalty' | 'RankUp' | null
          rank_difficulty: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          plan_json: Json
          xp_potential: number
          status?: 'Active' | 'Completed' | 'Failed' | 'Skipped' | 'Pending_Verification' | null
          requires_proof?: boolean | null
          expires_at: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          quest_type?: 'Daily' | 'Special' | 'Penalty' | 'RankUp' | null
          rank_difficulty?: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          plan_json?: Json
          xp_potential?: number
          status?: 'Active' | 'Completed' | 'Failed' | 'Skipped' | 'Pending_Verification' | null
          requires_proof?: boolean | null
          expires_at?: string
          created_at?: string | null
        }
        Relationships: []
      }
      logs: {
        Row: {
          id: string
          quest_id: string
          user_id: string
          duration_actual: number
          user_feedback: string | null
          rpe_actual: number | null
          exercises_completed: Json | null
          xp_awarded: number | null
          safety_score: number | null
          integrity_score: number | null
          opik_trace_id: string | null
          proof_media_url: string | null
          proof_type: 'None' | 'Photo' | 'Video' | 'Timelapse' | null
          is_public: boolean | null
          verification_status: 'Auto_Approved' | 'Pending' | 'Verified' | 'Rejected' | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          quest_id: string
          user_id: string
          duration_actual: number
          user_feedback?: string | null
          rpe_actual?: number | null
          exercises_completed?: Json | null
          xp_awarded?: number | null
          safety_score?: number | null
          integrity_score?: number | null
          opik_trace_id?: string | null
          proof_media_url?: string | null
          proof_type?: 'None' | 'Photo' | 'Video' | 'Timelapse' | null
          is_public?: boolean | null
          verification_status?: 'Auto_Approved' | 'Pending' | 'Verified' | 'Rejected' | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          quest_id?: string
          user_id?: string
          duration_actual?: number
          user_feedback?: string | null
          rpe_actual?: number | null
          exercises_completed?: Json | null
          xp_awarded?: number | null
          safety_score?: number | null
          integrity_score?: number | null
          opik_trace_id?: string | null
          proof_media_url?: string | null
          proof_type?: 'None' | 'Photo' | 'Video' | 'Timelapse' | null
          is_public?: boolean | null
          verification_status?: 'Auto_Approved' | 'Pending' | 'Verified' | 'Rejected' | null
          completed_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          target_user_id: string
          target_log_id: string | null
          reason: 'Impossible_Stats' | 'Fake_Media' | 'Suspicious_Pattern' | 'Other'
          description: string | null
          status: 'Pending' | 'Reviewed' | 'Confirmed' | 'Dismissed' | null
          created_at: string | null
        }
        Insert: {
          id?: string
          reporter_id: string
          target_user_id: string
          target_log_id?: string | null
          reason: 'Impossible_Stats' | 'Fake_Media' | 'Suspicious_Pattern' | 'Other'
          description?: string | null
          status?: 'Pending' | 'Reviewed' | 'Confirmed' | 'Dismissed' | null
          created_at?: string | null
        }
        Update: {
          id?: string
          reporter_id?: string
          target_user_id?: string
          target_log_id?: string | null
          reason?: 'Impossible_Stats' | 'Fake_Media' | 'Suspicious_Pattern' | 'Other'
          description?: string | null
          status?: 'Pending' | 'Reviewed' | 'Confirmed' | 'Dismissed' | null
          created_at?: string | null
        }
        Relationships: []
      }
      rank_up_exams: {
        Row: {
          id: string
          user_id: string
          from_rank: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          to_rank: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          exam_quest_id: string | null
          proof_media_url: string
          hand_sign_required: string | null
          status: 'Pending' | 'Approved' | 'Rejected' | null
          reviewed_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          from_rank: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          to_rank: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          exam_quest_id?: string | null
          proof_media_url: string
          hand_sign_required?: string | null
          status?: 'Pending' | 'Approved' | 'Rejected' | null
          reviewed_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          from_rank?: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          to_rank?: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          exam_quest_id?: string | null
          proof_media_url?: string
          hand_sign_required?: string | null
          status?: 'Pending' | 'Approved' | 'Rejected' | null
          reviewed_at?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_leaderboard: {
        Args: {
          limit_count?: number
        }
        Returns: {
          user_id: string
          username: string
          total_xp: number
          level: number
          rank_tier: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank'
          class: 'Novice' | 'Striker' | 'Tank' | 'Assassin'
          hunter_status: 'Normal' | 'Verified' | 'Flagged' | 'Corrupted'
          streak_current: number
          global_rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
