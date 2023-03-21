<script setup lang="ts">


// <div class="flex justify-center items-center h-screen">
//   <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
//     <div class="flex flex-col gap-1 max-w-xl" w="300px">
//       <Alert :error="responseError" />
//       <label class=" text-gray-700 text-left" for="name">
//         First Name
//       </label>
//       <TheInput v-model="firstName" placeholder="Enter first name" autocomplete="false" />
//       <label class=" text-gray-700 text-left" for="name">
//         Last Name
//       </label>
//       <TheInput v-model="lastName" placeholder="Enter last name" autocomplete="false" />
//       <label class=" text-gray-700 text-left" for="email">
//         Email
//       </label>
//       <TheInput v-model="email" placeholder="Enter email" autocomplete="false" />
//       <p class="text-red-400 text-left text-sm">
//         {{ errors.email }}
//       </p>
//       <label class=" text-gray-700 text-left" for="pasword">
//         Password
//       </label>
//       <TheInput v-model="password" placeholder="Choose a password" autocomplete="false" type="password" />
//       <p class="text-red-400 text-left text-sm">
//         {{ errors.password }}
//       </p>
//       <button class="loading" btn mt-2 text-lg :onclick="handleSubmit">
//         {{ t('button.signup') }}
//       </button>
//     </div>
//   </div>
//   </div>


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
        <input v-model="firstname" type="text" for="firstname" name="firstname" placeholder="First name" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <input v-model="lastname" type="text" for="lastname" name="lastname" placeholder="Last name" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <input v-model="email" type="email" for="email" name="email" placeholder="Email address" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <input v-model="password" type="password" for="password" name="password" placeholder="Password" class="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button class="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-blue-600"
        onmouseover="this.style.backgroundColor='#1d4dc0';"
        onmouseout="this.style.backgroundColor='#2a67ec';"
        :onclick="handleSubmit">
        Sign Up
      </button>
      <hr class="my-5" />
      <button class="text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-500 " onmouseover="this.style.backgroundColor='#228B22';" onmouseout="this.style.backgroundColor='#34A853';">Already a member?</button>
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
