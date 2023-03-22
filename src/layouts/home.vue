<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200 ">
    <Navbar class="navbar"/>
    <div class="my-4"></div> <!-- add some margin here -->
    <RouterView class="my-4" /> <!-- add margin to RouterView component -->
    <TheFooter />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm"></div>
  </main>
</template>
