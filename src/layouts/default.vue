<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200 ">
    <Navbar class="navbar"/>
    <div class="my-4"></div> <!-- add some margin here -->
    <RouterView class="my-4 mt-20" /> <!-- add margin to RouterView component -->
    <TheFooter />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm"></div>
  </main>
</template>

<style>
.navbar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
