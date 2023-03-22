<script setup lang="ts">


// <div class="flex justify-center items-center h-screen">
//     <div class="bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
//       <div class="w-xl flex justify-center max-w-sm rounded overflow-hidden shadow-lg py-8 px-4 min-h-[400px]">
//         <div class="flex flex-col gap-1 max-w-xl" w="300px">
//           <label class="text-gray-700 text-left" for="email">
//             Email
//           </label>
//           <TheInput v-model="email" placeholder="What's your email?" autocomplete="false" />
//           <p class="text-red-400 text-left text-sm">
//             {{ errors.email }}
//           </p>
//           <label class="text-gray-700 text-left" for="password">
//             Password
//           </label>
//           <TheInput v-model="password" placeholder="What's your password?" autocomplete="false" type="password" />
//           <p class="text-red-400 text-left text-sm">
//             {{ errors.password }}
//           </p>
//           <button class="loading" btn mt-2 text-lg :onclick="handleSubmit">
//             {{ t('button.login') }}
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>




import { errorMessages } from '~/common/constants/data'
import { services } from '~/common/services/services'

const emit = defineEmits<{
  (e: 'signup', data: {
    email: string
    password: string
  }): void
}>()

const email = ref('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')
const isFormDirty = ref(false)
const user = useUserStore()
const errors = reactive({
  email: '',
  password: '',
})
const { t } = useI18n()
const router = useRouter()
const validateFields = () => {
  if (!email.value)
    errors.email = t('error.email')
  else
    errors.email = ''

  if (!password.value && password.value.length < 8)
    errors.password = t('error.password')
  else
    errors.password = ''
}

watch([email, password, passwordConfirm], () => {
  if (isFormDirty.value)
    validateFields()
})

const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault()
  if (!isFormDirty.value) {
    validateFields()
    isFormDirty.value = true
  }

  if (errors.email || errors.password)
    return

  const body = {
    email: email.value,
    password: password.value,
  }

  try {
    const loginResponse = await services.login(body.email, body.password)

    user.setAccessToken(loginResponse.data.idToken.jwtToken)
    user.isLoggedIn = true
    /* useLocalStorage('userresponse', loginResponse) */
    localStorageState.value = loginResponse.data
    if (loginResponse.status.toString().startsWith('2'))
      user.isLoggedIn = true
      router.push('/feed')
      //location.reload()
  }
  catch (error) {
    const errorMsg = error?.response?.data?.message
    if (errorMsg === errorMessages.userNotConfirmed)
      router.push('/auth/verify')
    if (errorMsg === errorMessages.wrongPassword)
      errors.password = t('error.wrongPassword')
  }
  emit('signup', body)
}


onMounted(() => {
  email.value = user.currentUser?.email || ''
})
</script>

<template>
  <section class="text-gray-600 body-font bg-gray-100">
    <div class="container xl:px-32 px-5 py-36 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center md:text-left ">Keepsake</h1>
        <p class="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium  text-black text-center md:text-left ">Connect with your loved ones.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <div class="relative mb-4">
          <input v-model="email" type="email" for="email" name="email" placeholder="Email address" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
        </div>
        <div class="relative mb-4">
          <input v-model="password" type="password" for="password" name="password" placeholder="Password" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
        </div>
        <button class="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-blue-600"
          :disabled="isFormSubmitting"
          @click="handleSubmit">
          {{ isFormSubmitting ? 'Logging in...' : 'Log In' }}
        </button>
        <p class="text-sm text-blue-500 py-5 text-center">Forgot password?</p>
        <hr class="my-5" />
        <router-link to="/signup" class="text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-500 " onmouseover="this.style.backgroundColor='#228B22';" onmouseout="this.style.backgroundColor='#34A853';">Create New Account</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  /* existing styles */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.text-gray-600 body-font bg-gray-100 {
  background-color: red;
}




</style>

