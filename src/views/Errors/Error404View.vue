<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full">
    <body class="h-full">
    ```
  -->
  <main class="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-9xl font-black text-indigo-600">404</p>
      <h1 class="mt-4 text-2xl font-bold tracking-tight text-white-900 sm:text-4xl">Page not found</h1>
      <p class="mt-6 text-base leading-7 text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink to="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</RouterLink>
        <RouterLink to="/contact" class="text-sm font-semibold text-white-900">Contact support <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Error404View'
}
</script>