<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import { services } from '~/common/services/services'
import type { Family } from '~/stores/types'

const families = ref<Family[] | null>(null)
const loading = ref<boolean>(false)


const getFamilies = async () => {
  loading.value = true
  const familyResponse = await services.getFamilies()
  families.value = familyResponse
  loading.value = false
}

onMounted(() => {
  getFamilies()
})
</script>

<template>
<div v-if="families && families.length > 0" class="grid-container">
  <FamilyCard v-for="family in families" :key="family._id" class="grid-item " :family="family" />
  <div class="fixed bottom-30 left-1/2 transform -translate-x-1/2 flex justify-center w-full flex-row">
    <AddFamilyButton class="mx-3 " />
    <JoinFamilyButton class="mx-3" />
  </div>
</div>
<div v-else-if="loading">

  <div class="grid grid-cols-2 gap-4">
    <div class="w-full h-24 border-2 rounded-md mx-auto mt-20">
      <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div class="w-12 bg-gray-300 h-12 rounded-full"></div>
        <div class="flex flex-col space-y-3">
          <div class="w-36 bg-gray-300 h-6 rounded-md"></div>
          <div class="w-24 bg-gray-300 h-6 rounded-md"></div>
        </div>
      </div>
    </div>
    <div class="w-full h-24 border-2 rounded-md mx-auto mt-20">
      <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div class="w-12 bg-gray-300 h-12 rounded-full"></div>
        <div class="flex flex-col space-y-3">
          <div class="w-36 bg-gray-300 h-6 rounded-md"></div>
          <div class="w-24 bg-gray-300 h-6 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>

</div>
<div v-else>
  <div class="w-full h-xl flex flex-col items-center mt-4 bg-white  px-8 pt-6 pb-8 mb-4 flex justify-center">
  <div class="font-bold text-gray-800 mb-10 text-4xl">View Families</div>
    <div class="container w-xl flex justify-center rounded-lg overflow-hidden shadow-lg  py-6 px-4 min-h-[200px]">
      <div class="">

        <h1 class="font-bold text-gray-900 mb-10 text-xl">Join or create a family to get started</h1>
        <div class="w-full justify-between">
          <AddFamilyButton class="mx-3" />
          <JoinFamilyButton class="mx-3" />
        </div>
      </div>
    </div>
  </div>
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

.container {
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.5);
}

</style>
