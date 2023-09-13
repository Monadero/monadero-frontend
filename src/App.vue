<template>
  <HeaderLayout></HeaderLayout>
  <router-view/>
</template>

<style lang="scss">
@import "base";
</style>

<script>
import HeaderLayout from "@/components/HeaderLayout.vue";

export default {
  name: "App",
  components: {
    HeaderLayout
  }
}
</script>

<script setup>
import { ref, onMounted } from 'vue'

import { supabase } from '@/lib/supabaseClient'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>