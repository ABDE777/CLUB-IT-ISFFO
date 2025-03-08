
import { saveFormToDatabase } from './supabaseClient';

interface SubmissionData {
  fullName: string;
  email: string;
  phone: string;
  className: string;
  institution: string;
  submissionType: "Join" | "Register";
}

export const saveToCsv = async (data: SubmissionData): Promise<void> => {
  // Save to Supabase
  const result = await saveFormToDatabase(
    {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      className: data.className,
      institution: data.institution
    }, 
    data.submissionType
  );
  
  // Log results
  if (result.success) {
    console.log("Data successfully saved to database");
  } else {
    console.error("Failed to save data:", result.error);
    // Fallback to console logging if database save fails
    console.log("Fallback: Saving data to console:", data);
  }
};
