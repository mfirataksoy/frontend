<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import { services } from '~/common/services/services'
import type { Family } from '~/stores/types'

const families = ref<Family[] | null>(null)

const getFamilies = async () => {
  const familyResponse = await services.getFamilies()
  families.value = familyResponse
}

onMounted(() => {
  getFamilies()
})
</script>

<template>
<div v-if="families" class="grid-container">
  <FamilyCard v-for="family in families" :key="family._id" class="grid-item " :family="family" />
</div>





  <div class="flex ">
    <AddFamilyButton class="mx-3" />
    <JoinFamilyButton class="mx-3" />
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-gap: 5px;
  grid-column-gap: 2%;
  grid-row-gap: 2%;
}


.grid-item {
  /* Add any custom styling for the FamilyCard component here */
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

</style>
