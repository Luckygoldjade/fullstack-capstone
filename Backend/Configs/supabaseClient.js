import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// https://supabase.com/docs/reference/javascript/initializing
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

export default supabase;