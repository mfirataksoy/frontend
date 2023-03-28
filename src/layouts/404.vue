<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center blue-600 dark:blue-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <RouterView />
    <div class="flex justify-center">
      <button btn text-sm m="3 t8" class="bg-blue-600" @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
