<template>
  <div class="dashboard w-5/6 absolute right-0 p-5">
    <div class="flex justify-end min-w-full">
      <div class="user-headline flex items-center hover:text-indigo-400 hover:cursor-pointer" @click="this.logout()">
        <div class="user-headline__avatar aspect-square w-8 rounded-full mx-0.5 sm:mx-2">
          <img :src="this.user.avatar" :alt="this.user.firstName + ' ' + this.user.lastName" class="object-cover min-h-full rounded-full">
        </div>
        <p class="text-sm hidden sm:block">Hallo {{this.user.firstName}} {{this.user.lastName}}!</p>
        <ArrowRightOnRectangleIcon class="w-5 ml-0.5 sm:ml-3"></ArrowRightOnRectangleIcon>
      </div>
    </div>
    <h1 class="text-2xl xs:text-5xl font-black">Dashboard</h1>
  </div>
</template>

<script setup>
</script>

<script>
import {ArrowRightOnRectangleIcon} from "@heroicons/vue/24/outline";
import useAuthUser from "@/composables/useAuthUser";
const { user, getAllUserData, logout } = useAuthUser();
export default {
  name: "DashboardView",
  data() {
    return {
      user: Object
    }
  },
  setup() {
    return {
      logout
    }
  },
  async mounted() {
    let userId = user._value.id
    this.user = await getAllUserData({userId})
  },
  components: {
    ArrowRightOnRectangleIcon
  }
}
</script>