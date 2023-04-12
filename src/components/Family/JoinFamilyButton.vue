<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { services } from "~/common/services/services";
import Alert from "../Notification/Alert.vue";
const { t } = useI18n();
const errorMessage=ref("");
const isOpen = ref(false);
const error = ref<{ title: string; body: string }>({ title: '', body: '' });
const errorvisible = ref(false);
const code = ref("");

function closeModal() {
  errorvisible.value=false;
  errorMessage.value="";
  code.value="";
  isOpen.value = false;
}
async function openModal() {
  isOpen.value = true;
}
async function joinFamily() {
  try {
    const nowJoinedFamily = await services.joinFamily(code.value);
    const currentFamilies = await services.getAccountDetails();
    const familyIdArray = currentFamilies.familyId || []; // In case familyId is empty
    familyIdArray.push(nowJoinedFamily._id);
    const response = await services.editAccountDetails({
      _id: currentFamilies._id,
      familyId: familyIdArray
    });
    console.log(response);
    window.location.reload();
  } catch (error) {
    errorvisible.value=true
    errorMessage.value = error.response?.data?.message || "Unknown error";
    //alert(errorMessage); // Replace with your preferred method of displaying error messages
    console.log(error)
  }
}

// async function joinFamily() {
//   const nowJoinedFamily = await services.joinFamily(code.value);
//   const currentFamilies = await services.getAccountDetails();
//   const familyIdArray = currentFamilies.familyId || []; // In case familyId is empty
//   familyIdArray.push(nowJoinedFamily._id);
//   const response = await services.editAccountDetails({
//   _id: currentFamilies._id,
//   familyId: familyIdArray
// });  console.log(response);
//   window.location.reload();
// }
</script>

<template>
  <button
    class=""
    style=""
    @click="openModal"
  >
    <span>{{ t("spasan") }}</span>
    <div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl custom-black p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-center text-xl font-medium leading-6 text-white"
                  >
                    Join a New Family
                  </DialogTitle>
                  <div v-if="errorvisible">
                  <Alert :error="{title: errorMessage, body: 'Please fix the error and try again.'}"></Alert> 
                  </div>
                  <div class="mx-auto flex flex-col gap-1 max-w-xl" w="300px">
                    <label class="text-gray-100 text-center text-sm pt-3 pb-3" for="name">
                      Ask your family lead for the family code
                    </label>
                    <TheInput
                      v-model="code"
                      placeholder="Enter family code"
                      autocomplete="false"
                    />
                    <button
                      type="button"
                      class="bg-white rounded-md text-black font-bold py-2 px-4 rounded shadow-lg hover:scale-105 transition duration-300 py-1 mt-1"
                      @click="joinFamily"
                    >
                      Join family
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

<style>


</style>
