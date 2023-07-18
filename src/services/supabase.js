import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xyoimsligkxprxejjexn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b2ltc2xpZ2t4cHJ4ZWpqZXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNDg5MjgsImV4cCI6MjAwNDkyNDkyOH0.mRz97Kitp1fGDSIQA_pFuoHPw8pDN0a51S6ZrS0O24s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
