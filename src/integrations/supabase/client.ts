// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uiyledjcizgshvkhwssy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeWxlZGpjaXpnc2h2a2h3c3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NjE0NzksImV4cCI6MjA2MDUzNzQ3OX0.KAO-Fqhf2JmiE_ZidUit9h_1kkUD99Qmq69b1mfkPNg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);