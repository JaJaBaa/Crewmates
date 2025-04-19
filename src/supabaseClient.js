import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eqpyvemwagxppgvmebmq.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcHl2ZW13YWd4cHBndm1lYm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMjU1MDQsImV4cCI6MjA2MDYwMTUwNH0.0egEmMZ6IfrUBKWKBdf1lJZDiT2P3oeuc9x8_HsD2d0";

if (!supabaseKey) {
  console.error(
    "Supabase key is missing. Make sure your .env file is configured correctly."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
