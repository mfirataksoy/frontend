<script setup lang="ts">

const user = useUserStore()


</script>

<style>
  @import url('/public/fonts.css');
</style>


<template>
  <div v-if="!user.isLoggedIn.value" class="flex justify-center">
    <a href="/">
      <div
        class="bg-white rounded-md w-30 "
      >
        <h1 class=" text-3xl text-black font-bold" style="font-family: 'Keepsake'">
          Keepsake
        </h1>
      </div>
    </a>
  </div>
  <div v-else class="flex justify-center">
      <div
        class="bg-white rounded-md   w-30 "
      >
        <h1 class=" text-xl text-black " style="font-family: 'Keepsake'">
          Keepsake
        </h1>
      </div>
  </div>
</template>
