<script setup lang="ts">

const user = useUserStore()


</script>

<template>
  <div v-if="!user.isLoggedIn.value" class="flex justify-center">
    <a href="/">
      <div
        class="bg-white rounded-md w-30 "
      >
        <h1 class=" text-xl text-black font-bold">
          KEEPSAKE
        </h1>
      </div>
    </a>
  </div>
  <div v-else class="flex justify-center">
      <div
        class="bg-white rounded-md   w-30 "
      >
        <h1 class=" text-xl text-black font-bold">
          KEEPSAKE
        </h1>
      </div>
  </div>
</template>
