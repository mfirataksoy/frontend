import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from './types'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  //const isLoggedIn = ref(false)
  const isLoggedIn = reactive({ value: false })
  const previousNames = ref(new Set<string>())
  const currentUser = ref<User | null>(null)
  const accessToken = ref<string>('')
  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }
  function setUser(user: User) {
    currentUser.value = user
  }
  function setAccessToken(token: string) {
    accessToken.value = token
  }

  // function switchIsLoggedIn() {
  //   console.log(isLoggedIn.value)
  //   isLoggedIn.value = !isLoggedIn.value
  //   console.log(isLoggedIn.value)
  // }

  function logout() {
    isLoggedIn.value = false
  }

  function login() {
    isLoggedIn.value = true
  }

  // function switchIsLoggedIn() {
  //   // Get the current value of "loggedin" from local storage
  //   var isLoggedIn = localStorage.getItem("loggedin");
  
  //   // If the value is "true", set it to "false", and vice versa
  //   if (isLoggedIn === "true") {
  //     isLoggedIn = "false";
  //   } else {
  //     isLoggedIn = "true";
  //   }
  
  //   // Store the updated value of "loggedin" in local storage
  //   localStorage.setItem("loggedin", isLoggedIn);
  // }
  

  return {
    setNewName,
    otherNames,
    savedName,
    currentUser,
    accessToken,
    setUser,
    setAccessToken,
    isLoggedIn,
    logout,
    login
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
