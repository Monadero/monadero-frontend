import { createClient } from '@supabase/supabase-js'

console.log(process.env.VUE_APP_SUPABASE_KEY)
export const supabase = createClient('https://eizduxzwxtvqewmctivu.supabase.co', process.env.VUE_APP_SUPABASE_KEY)