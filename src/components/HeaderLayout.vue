<template>
  <header class="absolute inset-x-0 top-0 z-50" v-if="!inUserMode">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Monadero</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </RouterLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-white-900">{{ item.name }}</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink to="/login" class="text-sm font-semibold leading-6 text-indigo-400">Log in <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-blue-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-900 hover:bg-gray-50">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <RouterLink to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  <header class="inset-x-0 top-0 z-50 md:w-1/6 w-16 bg-cyan-500 p-2 min-h-screen rounded-r-lg shadow-2xl shadow-cyan-400 fixed" v-else>
    <h1 class="text-3xl md:text-base uppercase font-black text-center mt-3 xl:text-3xl flex justify-center min-w-full">M<span class="hidden md:block">onadero</span></h1>
    <DashboardNavigation :user-id="userId"></DashboardNavigation>
  </header>
</template>

<script>
import {Dialog, DialogPanel} from "@headlessui/vue";
import {Bars3Icon, XMarkIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

import useAuthUser from "@/composables/useAuthUser";
import DashboardNavigation from "@/views/User/DashboardNavigation.vue";
export default {
  components: {DashboardNavigation},
  data() {
    return {
      inUserMode: !!this.$route.fullPath.includes('/user')
    }
  },
  setup() {
    const navigation = [
      { name: 'Product', href: '/product' },
      { name: 'Features', href: '/features' },
      { name: 'Prices', href: '/prices' },
      { name: 'Demo', href: '/request-demo' },
    ]

    const mobileMenuOpen = ref(false)
    const { user } = useAuthUser();

    const userId = user

    return {
      user,
      userId,
      navigation,
      mobileMenuOpen,
      Bars3Icon,
      XMarkIcon,
      Dialog,
      DialogPanel
    }
  },
  watch:{
    $route (to){
      this.inUserMode = !!to.fullPath.includes('/user');
    }
  }
}
</script>