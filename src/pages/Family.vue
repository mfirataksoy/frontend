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
  setTimeout(() => {
      loading.value = false;
    }, 1000); // set loading to false after 2 seconds
}

onMounted(() => {
  getFamilies()
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="">
      <AddFamilyButton class="mt-20 ml-10 mb-5 custom-black rounded-md text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300" />
    </div>
    <h1 class="text-6xl font-bold text-black mx-auto text-shadow mt-20">My Families</h1>
    <div class="mx-3">
      <JoinFamilyButton class="mt-20 ml-10 mb-5 custom-black rounded-md text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300" />
    </div>
  </div>
  <div class="custom-black-text border-b-2 font-bold mb-10 ml-10 mr-10 mt-10"></div>
<div v-if="families && families.length > 0" class="grid-container ml-10 mr-10 mb-50">
  <FamilyCard v-for="family in families" :key="family._id" class="grid-item " :family="family" />
  <div class="fixed bottom-30 left-1/2 transform -translate-x-1/2 flex justify-center w-full flex-row">
    <!-- <AddFamilyButton class="mx-3 " /> -->
    <!-- <JoinFamilyButton class="mx-3" /> -->
  </div>
</div>
<div v-else-if="loading">

  <div class="w-full h-24 border-2 border-black rounded-md mx-auto mt-20">
    <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div class="w-12 bg-black h-12 rounded-full " />
      <div class="flex flex-col space-y-3">
        <div class="w-36 bg-black h-6 rounded-md " />
        <div class="w-24 bg-black h-6 rounded-md " />
      </div>
    </div>
  </div>

</div>
<div v-else>
  <div class="w-full h-xl flex flex-col items-center mt-4 px-8 pt-6 pb-8 mb-4 flex justify-center">
  <div class="font-bold text-gray-800 mb-10 text-4xl">Join or create a family to get started.</div>
    <div class=" w-xl flex justify-center rounded-lg overflow-hidden py-6 px-4 min-h-[200px]">
      <div class="">

        <div class="w-full justify-between">
          <AddFamilyButton class="mx-3 custom-black rounded-md text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300" />
          <JoinFamilyButton class="mx-3 custom-black rounded-md text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300" />
        </div>
      </div>
    </div>
  </div>
</div>







</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-gap: 5px;
  grid-column-gap: 2%;
  grid-row-gap: 2%;
  margin-right: 20%;
  margin-left: 20%;
}


.grid-item {
  /* Add any custom styling for the FamilyCard component here */
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.container {
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.5);
}

.custom-black {
  background-color: #272727;
}

.custom-black-text {
  border-color: #272727;
}

</style>
