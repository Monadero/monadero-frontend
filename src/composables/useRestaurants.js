import {supabase} from "@/lib/supabaseClient";

export default function useRestaurant() {
    const getRestaurants = async (userId) => {
        console.log(userId)
        try {
            const {data, error} = await supabase.from('restaurants').select('*').eq('rest_admin_id', userId)
            let restaurants = []
            for (let i = 0; i < data.length; i++) {
                let restaurantObject = {
                    restId: data[i].id,
                    restName: data[i].rest_name
                }
                restaurants.push(restaurantObject)
            }
            console.log(restaurants)
            if (error) throw error
            return restaurants
        } catch (e) {
            console.error(e)
        }
    }

    return {
        getRestaurants
    }
}