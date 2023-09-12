import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/useAuthUser";

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = useAuthUser();
    user.value = session?.user || null;
});

export default function useSupabase() {
    return { supabase };
}