<script setup lang="ts">

const user = useUserStore()


</script>

<template>
  <div v-if="!user.isLoggedIn.value" class="flex justify-center">
    <a href="/">
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800  hover:to-blue-900   w-30 "
      >
        <h1 class=" text-xl text-white font-bold">
          KEEPSAKE
        </h1>
      </div>
    </a>
  </div>
  <div v-else class="flex justify-center">
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800  hover:to-blue-900   w-30 "
      >
        <h1 class=" text-xl text-white font-bold">
          KEEPSAKE
        </h1>
      </div>
  </div>
</template>
