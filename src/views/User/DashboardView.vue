<template>
  <div class="dashboard">
    {{user}}
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/useAuthUser";
const { user } = useAuthUser();
</script>