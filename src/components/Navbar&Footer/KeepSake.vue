<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const user = useUserStore();
  const router = useRouter();

  const handleClick = () => {
    if (user.isLoggedIn.value) {
      router.push("/feed");
    } else {
      router.push("/");
    }
  };
</script>

<style>
  @import url('/public/fonts.css');

  .app-container {
    @apply flex justify-center;
  }

  .keepsake-box {
    @apply bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg p-2 w-28 shadow-md cursor-pointer;
  }

  .keepsake-title {
    @apply text-2xl font-bold text-gray-900 text-center;
    font-family: 'Keepsake';
  }
</style>

<template>
  <div class="app-container">
    <div @click="handleClick" class="keepsake-box">
      <h1 class="keepsake-title">Keepsake</h1>
    </div>
  </div>
</template>
