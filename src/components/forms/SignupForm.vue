<script setup lang="ts">


import { services } from '~/common/services/services'
const emit = defineEmits<{
  (e: 'login', data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): void
}>()
const user = useUserStore()
const router = useRouter()
const email = ref<string>('')
const password = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')

/* const formData = reactive<SignupData>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
 */
const isFormDirty = ref(false)
const errors = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
const responseError = reactive(
  {
    title: '',
    body: '',
  },
)
const { t } = useI18n()

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

watch([email, password], () => {
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
    const signupresponse = await services.signup({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    })
    if (signupresponse.status === 201) {
      user.setUser(signupresponse.data)
      router.push('/auth/verify')
    }
  }
  catch (error) {
    responseError.title = t('login.errors.title')
    responseError.body = t('login.errors.body')
  }

  emit('signup', body)
}

function redirectToLogin() {
  console.log("here")
  router.push('/auth/login')
}

</script>

<template>
  <section class="text-gray-600 body-font min-h-screen">

    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      class="svg absolute hidden lg:block"
      style="height: 560px; width: 100%; z-index: -10; overflow: hidden"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="#272727" offset="0%"></stop>
          <stop stop-color="#272727" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient-0)"
        d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
      ></path>
    </svg>

    <div class="container xl:px-32 px-5 py-36 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-bold lg:text-7xl text-6xl text-white text-center md:text-left ">Keepsake</h1>
        <p class="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium  text-white text-center md:text-left ">Connect with your loved ones.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 custom-black shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <div class="relative mb-4">
          <input v-model="firstname" type="text" for="firstname" name="firstname" placeholder="First name" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div class="relative mb-4">
          <input v-model="lastname" type="text" for="lastname" name="lastname" placeholder="Last name" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div class="relative mb-4">
          <input v-model="email" type="email" for="email" name="email" placeholder="Email address" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          <p class="text-red-400 text-left text-sm">{{ errors.email }}</p>
        </div>
        <div class="relative mb-4">
          <input v-model="password" type="password" for="password" name="password" placeholder="Password" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          <p class="text-red-400 text-left text-sm">{{ errors.password }}</p>
        </div>
        <button class="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-blue-600"
          onmouseover="this.style.backgroundColor='#1d4dc0';"
          onmouseout="this.style.backgroundColor='#2a67ec';"
          :onclick="handleSubmit">
          Sign Up
        </button>
        <hr class="my-5" />
        <button class="text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-500 " onmouseover="this.style.backgroundColor='#228B22';" onmouseout="this.style.backgroundColor='#34A853';" @click="redirectToLogin">Already a member?</button>
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

.custom-color {
  background-color: #bcecc2;
}

.custom-black {
  background-color: #272727;
}

@media screen and (max-width: 640px) {
  .svg {
    height: 300px;
  }
}




</style>
