<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { services } from '~/common/services/services'
import Alert from "../Notification/Alert.vue"; // import the Alert component
import { i } from 'vitest/dist/index-50755efe';

const { t } = useI18n()

const isOpen = ref(false)

const user = useUserStore()

const familyCreatedCount = ref(0);

const familyName = ref('')
const errorMessage = ref("");
const errorvisible = ref(false);

function closeModal() {
  isOpen.value = false
  errorMessage.value = "";
  errorvisible.value = false;
}
async function openModal() {
  const id = user.currentUser?._id;
  const res = await services.getAccountDetails();
  console.log(res.familyCreatedCount)

  if (id) {
    isOpen.value = true;
  } else {
  isOpen.value = true;
  }
}




async function createFamily() {
  try {
    const res = await services.getAccountDetails();
    if(res.familyCreatedCount >= 1) {
      console.log(familyCreatedCount)
      throw new Error("You can only create one family");
    }
    else{
      const nowJoinedFamily = await services.createFamily(familyName.value)
      const currentFamilies = await services.getAccountDetails();
      const familyIdArray = currentFamilies.familyId || []; // In case familyId is empty
      familyIdArray.push(nowJoinedFamily._id);
      const response = await services.editAccountDetails({
      _id: currentFamilies._id,
      familyId: familyIdArray
  });
  console.log(response);
  await services.increaseFamilyCount();
  window.location.reload();
    }
  }
  catch (error) {
    errorvisible.value = true;
    errorMessage.value = error.message || "Unknown error";
    console.log(error);
  }
}

function clearError() {
  errorvisible.value = false;
  errorMessage.value = "";
}

</script>

<template>

  <button
    class=""
    style="" @click="openModal"
  >
  <div>
    <span>{{ t("asd") }}</span>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
          <TransitionChild
            as="template" enter="duration-300 ease-out" enter-from="opacity-0"
            enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto items-center">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl custom-black p-6 text-left align-middle shadow-xl transition-all"
                >
                <DialogTitle as="h3" class="text-center text-xl font-medium leading-6 text-white">
                    Create a new family
                  </DialogTitle>
                  <div v-if="errorvisible">
                    <Alert :error="{title: errorMessage, body: 'Please upgrade your membership plan to be able to create more families.'}"></Alert> 
                  </div>

                  <div class="mx-auto flex flex-col gap-1 max-w-xlr" w="300px">
                    <label class=" text-gray-100 text-center text-sm pt-3 pb-3" for="name">
                      Choose a family name
                    </label>
                    <TheInput v-model="familyName" placeholder="Other users will see this name" autocomplete="false" />
                    <button
                      type="button"
                      class="bg-white rounded-md text-black font-bold py-2 px-4 rounded shadow-lg hover:scale-105 transition duration-300 py-1 mt-1"
                      @click="createFamily"
                    >
                      Create new family
                    </button>

                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </button>
</template>

<style scoped>

</style>
