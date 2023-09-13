import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

let user = ref(null);
export default function useAuthUser() {
    const login = async ({email, password}) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({email, password})
            if (error) throw error;
            user.value = data.user
            return user
        } catch (e) {
            console.error(e)
        }
    };
    const getAllUserData = async ({userId}) => {
        let userObject = {
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            avatar: String,
            plan: {
                planId: Number
            }
        }

        // get User Personal Data
        userObject.email = user.value.email
        userObject.phone = user.value.phone
        try {
            const { data: userProfiles, error } = await supabase
                .from('userProfiles')
                .select("*").eq('id', userId)
            if (error) throw error;
            userObject.firstName = userProfiles[0].first_name
            userObject.lastName = userProfiles[0].last_name
            userObject.plan.planId = userProfiles[0].planId
            userObject.avatar = userProfiles[0].avatar
        } catch (e) {
            console.error(e)
        }

        return userObject
    }
    const loginWithRefreshToken = async (token) => {
        const { user, error } = await supabase.auth.signInWithPassword({ refreshToken: token });
        if (error) throw error;
        return user;
    };
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.reload()
    };
    const isLoggedIn = () => {
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
        getAllUserData,
        loginWithRefreshToken,
        isLoggedIn,
        logout,
        register,
        update,
        sendPasswordResetEmail
    }
}