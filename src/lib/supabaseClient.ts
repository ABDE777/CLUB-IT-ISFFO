
import { createClient } from '@supabase/supabase-js';
import { FormData } from './types';

// Get Supabase URL and key from environment variables or use fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Extended interface for form data with optional event title
interface ExtendedFormData extends FormData {
  eventTitle?: string;
}

// Function to save form submissions to Supabase
export const saveFormToDatabase = async (data: ExtendedFormData, submissionType: "Join" | "Register"): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Saving ${submissionType} form data to Supabase:`, data);
    
    // Insert submission into database
    const { error } = await supabase
      .from('form_submissions')
      .insert([
        { 
          ...data, 
          submission_type: submissionType,
          event_title: data.eventTitle || null,
          created_at: new Date().toISOString() 
        }
      ]);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error saving to database:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

// Function to get all submissions from the database
export const getFormSubmissions = async (): Promise<{ data: any[] | null; error: any }> => {
  return await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });
};

// Function to get submissions by type
export const getFormSubmissionsByType = async (type: "Join" | "Register"): Promise<{ data: any[] | null; error: any }> => {
  return await supabase
    .from('form_submissions')
    .select('*')
    .eq('submission_type', type)
    .order('created_at', { ascending: false });
};
