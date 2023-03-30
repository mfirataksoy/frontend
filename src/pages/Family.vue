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
<div v-if="families && families.length > 0" class="grid-container">
  <FamilyCard v-for="family in families" :key="family._id" class="grid-item " :family="family" />
  <div class="fixed bottom-30 left-1/2 transform -translate-x-1/2 flex justify-center w-full flex-row">
    <AddFamilyButton class="mx-3 " />
    <JoinFamilyButton class="mx-3" />
  </div>
</div>
<div v-else>
  <div class="w-full h-xl flex flex-col items-center mt-4 bg-white  px-8 pt-6 pb-8 mb-4 flex justify-center">
  <div class="font-bold mb-10 text-4xl">View Families</div>
    <div class="container w-xl flex justify-center rounded-lg overflow-hidden shadow-lg  py-6 px-4 min-h-[200px]">
      <div class="">

        <h1 class="font-bold mb-10 text-xl">Join or create a family to get started</h1>
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
