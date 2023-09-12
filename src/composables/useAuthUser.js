import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

let user = ref(null);
export default function useAuthUser() {
    const login = async ({email, password}) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({email, password})
            if (error) throw error;
            console.log(data)
            user.value = data.user
            return user
        } catch (e) {
            console.error(e)
        }
    };
    const loginWithRefreshToken = async (token) => {
        const { user, error } = await supabase.auth.signInWithPassword({ refreshToken: token });
        if (error) throw error;
        return user;
    };
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };
    const isLoggedIn = () => {
        console.log(user)
        return !!user.value;
    };
    const register = async ({email, password, ...meta}) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            {
                data: meta,
                redirectTo: `${window.location.origin}/user/dashboard?fromEmail=registrationConfirmation"`,
            }
        );
        if (error) throw error;
        return user;
    };
    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data);
        if (error) throw error;
        return user;
    }
    const sendPasswordResetEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) throw error;
        return user;
    };

    return {
        user,
        login,
        loginWithRefreshToken,
        isLoggedIn,
        logout,
        register,
        update,
        sendPasswordResetEmail
    }
}