<template>
  <div class="user_navbar mt-3 border-t pt-3 border-cyan-200">
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-light leading-6 text-white-900">Choose restaurant</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton class="relative w-full cursor-default rounded-md border py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm sm:leading-6">
        <span class="flex items-center">
          <span class="ml-3 block truncate text-white">{{ selected.name }}</span>
        </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="restaurant in (restaurants)" :key="restaurant.restId" :value="restaurant" v-slot="{ active, selected }">
              <li :class="[active ? 'bg-cyan-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ restaurant.restName }}</span>
                </div>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-cyan-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import useRestaurant from "@/composables/useRestaurants";
export default {
  name: 'DashboardNavigation',
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    ChevronUpDownIcon,
    CheckIcon
  },
  props: [
    'userId'
  ],
  async setup(props) {
    const { getRestaurants } = useRestaurant()

    const restaurants = await getRestaurants(props.userId.id)
    console.log(restaurants)

    const selected = ref(restaurants[0])
    return {
      restaurants,
      selected,
      CheckIcon,
      ChevronUpDownIcon
    }
  }
}
</script>