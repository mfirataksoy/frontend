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
const { t } = useI18n()

const isOpen = ref(false)

const familyName = ref('')

function closeModal() {
  isOpen.value = false
}
async function openModal() {
  isOpen.value = true
}

async function createFamily() {
  const nowJoinedFamily = await services.createFamily(familyName.value)
  const currentFamilies = await services.getAccountDetails();
  const familyIdArray = currentFamilies.familyId || []; // In case familyId is empty
  familyIdArray.push(nowJoinedFamily._id);
  const response = await services.editAccountDetails({
  _id: currentFamilies._id,
  familyId: familyIdArray
  });
  console.log(response);
  window.location.reload();
  }
</script>

<template>
  <button
    class="shadow-lg text-white px-4 w-auto h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    style="" @click="openModal"
  >
    <span>{{ t("asd") }}</span>
    <div>
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
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle as="h3" class="text-center text-xl font-medium leading-6 text-black">
                    Create a new family
                  </DialogTitle>

                  <div class="mx-auto flex flex-col gap-1 max-w-xlr" w="300px">
                    <label class=" text-gray-700 text-center text-sm pt-3 pb-3" for="name">
                      Choose a family name
                    </label>
                    <TheInput v-model="familyName" placeholder="Other users will see this name" autocomplete="false" />
                    <button
                      type="button"
                      class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800 hover:to-blue-900 text-white font-bold py-2 px-4 rounded shadow-lg mt-1"
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
