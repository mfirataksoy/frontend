<!-- This example requires Tailwind CSS v3.0+ -->
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const { t } = useI18n()
const mobileMenuOpen = ref(false)
</script>

<template>
  <section class="mb-40 mt-20">

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

    <div class="px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left">
      <div class="container mx-auto xl:px-32">
        <div class="grid lg:grid-cols-2 gap-12 flex items-center">
          <div class="mt-12 lg:mt-0">
            <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 text-white">Keepsake. <br /><span class="text-white">Share your Stories and Memories.</span></h1>
            <a class="bg-white text-black rounded-md font-bold py-2 px-4 rounded shadow-lg" data-mdb-ripple="true" data-mdb-ripple-color="light" href="/auth/signup" role="button">Get started</a>
            <a class="inline-block px-7 py-3 bg-transparent font-bold text-white font-medium text-sm leading-snug uppercase rounded-md hover:text-black hover:bg-white ml-3 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="/auth/login" role="button">Log in</a>
          </div>
          <div class="mb-12 lg:mb-0">
            <img
              src="https://imgs.search.brave.com/5EcLTemFzq-iyfET1_Pu1HpOAMjihfTG2toOWlUTqoU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/LnMzLmFtYXpvbmF3/cy5jb20vaW1hZ2Vz/L21hbi1hbmQtd29t/YW4taG9sZGluZy1o/YW5kcy1yb3lhbHR5/LWZyZWUtaW1hZ2Ut/MTU3NjY5ODUwOC5q/cGc"
              class="w-full rounded-lg shadow-lg"
              alt=""
              style="opacity: 0.99;"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="border-2 custom-black-border ml-20 mr-20"></div>
  <section class="">
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="grid grid-cols-2 gap-4 mt-8">
              <img class="w-full rounded-lg" src="https://imgs.search.brave.com/ZaRb0Y_AX8m7oY2MILISqXmGCYx2Mw70rJkh6athYbA/rs:fit:346:500:1/g:ce/aHR0cDovL2JydWNl/YnJhbW1hbGxmaW5h/bmNpYWwuY29tLmF1/L2Jsb2cvd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMDUvSGVs/cGluZy1oYW5kcy5q/cGc" alt="office content 1">
              <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://imgs.search.brave.com/6e6X83MLop-Kq5TgneJxd4-2RbOlnuft2WEi49osdq4/rs:fit:676:1018:1/g:ce/aHR0cDovLzQuYnAu/YmxvZ3Nwb3QuY29t/Ly02WGdYcTFCYWxQ/dy9WQmRNbWZ6SkpP/SS9BQUFBQUFBQUJK/US9kbkJZMFh5aGtD/by9zMTYwMC9mYW1p/bHkuanBlZw" alt="office content 2">
          </div>
          <div class="custom-black rounded-3xl font-light text-gray-500 sm:text-lg dark:text-gray-400 p-10">
            
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white ">Our Mission</h2>
              <p class="mb-4 text-gray-100">Bring friends and family closer by providing an online platform to record their voices in the form of stories, reading books, singing songs and more. We help you build memories and cherish your loved ones from anywhere across the globe.</p>
          </div>
          
      </div>
  </section>
</template>

<style scoped>

.custom-black {
  background-color: #272727;
}

.custom-black-border {
  border-color: #272727;
}


</style>