<script setup lang="ts">
import { ref, shallowRef, toRaw } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type {CreateSubscriptionResponse} from "~/models/types/create-subscription-response"

// Component state
const state = ref<{
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMessage: string
}>({
  status: 'idle',
  errorMessage: ''
})

const utm = useNuxtUTM()

interface FormData {
  email: string,
  utm_source: string,
  utm_medium: string,
  utm_channel: string,
  utm_campaign: string,
  reactivate_existing: boolean,
  send_welcome_email: boolean,
}

const getInitialFormData = (): FormData => ({
  email: "",
  utm_source: utm.value[0]?.utmParams.utm_source || 'findlocalhaunts.com',
  utm_medium: utm.value[0]?.utmParams.utm_medium || 'organic',
  utm_channel: utm.value[0]?.utmParams.utm_channel || '',
  utm_campaign: utm.value[0]?.utmParams.utm_campaign || '',
  reactivate_existing: true,
  send_welcome_email: true,
})

const form = ref<FormData>(getInitialFormData())

// Computed properties
const isSubmitting = computed(() => state.value.status === 'submitting')
const isSuccess = computed(() => state.value.status === 'success')
const isError = computed(() => state.value.status === 'error')
const showForm = computed(() => !isSuccess.value && !isSubmitting.value)

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

const resetForm = () => {
  form.value = getInitialFormData();
};

// Form validation
const validateForm = (): boolean => {
  if (!form.value.email.trim()) {
    state.value.errorMessage = 'Email is required'
    return false
  }

  if (!isValidEmail(form.value.email)) {
    state.value.errorMessage = 'Please enter a valid email address'
    return false
  }

  return true
}

const submitForm = async() => {
  state.value.errorMessage = ''

  if (!validateForm()) {
    state.value.status = 'error'
    return
  }

  try {
    state.value.status = 'submitting'
    const response = await useApi<CreateSubscriptionResponse>('/api/subscribe', {
      method: 'POST',
      body: form.value
    })

    console.log('response: ', response)
    if (response.data.status === 'validating' || response.data.status === 'active') {
      state.value.status = 'success'
    } else {
      throw new Error('Invalid response status')
    }
  } catch (error) {
    state.value.status = 'error'
    state.value.errorMessage = 'There was an error processing your request. Please try again in a few minutes.'
  }
}

</script>

<template>
  <section id="hero" class="bg-dark py-16 sm:py-24 lg:py-32 bg-center bg-no-repeat bg-[url('/images/bg01.jpg')]" style="background-image: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.4)),url('/images/bg01.jpg')">
    <div class="mx-auto my-40 grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div class="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
        <h2 class="text-tertiary inline sm:block lg:inline xl:block">Our goal is to bring you a simple search to find haunted attractions in your area.</h2>
      </div>
      <form v-if="showForm"
            @submit.prevent="submitForm"
            class="w-full max-w-md lg:col-span-5 lg:pt-2"
            :aria-busy="isSubmitting"
            novalidate>
        <div class="flex gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model="form.email"
                 id="email-address"
                 name="email"
                 type="email"
                 autocomplete="email"
                 required
                 class="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                 placeholder="Enter your email"
                 :disabled="isSubmitting"
                 @blur="validateForm">
          <button type="submit"
                  class="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-tertiary-500 shadow-sm hover:bg-primary-300 hover:text-tertiary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  :disabled="isSubmitting">{{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}</button>
        </div>
        <!-- Error Message -->
        <p
            v-if="isError"
            class="text-red-400 font-bold mt-4 text-sm leading-6"
            role="alert"
        >
          {{ state.errorMessage }}
        </p>
        <p class="text-tertiary-300 mt-4 text-sm leading-6">
          We care about your data. Read our
          <NuxtLink
              to="/privacy"
              class="font-semibold text-tertiary-500 hover:text-tertiary-700"
          >
            privacy&nbsp;policy
          </NuxtLink>.
        </p>
      </form>
      <div
          v-if="isSuccess"
          class="w-full max-w-md lg:col-span-5 lg:pt-2"
          role="status"
      >
        <div class="flex gap-x-4 items-center">
          <FontAwesomeIcon
              icon="fas fa-check"
              class="text-5xl text-green-600"
          />
          <span class="text-green-500 text-lg">
            Thank you for subscribing!
          </span>
        </div>
        <p class="text-tertiary-300 mt-4 text-sm leading-6">
          You should receive a welcome email shortly.
        </p>
      </div>
    </div>
  </section>
<!--  <div v-if="showSpinner" class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    <div class="flex justify-center items-center mt-[50vh]">
      <font-awesome-icon icon="fas fa-circle-notch" class="fa-spin fa-5x text-primary-600" />
    </div>
  </div>-->
  <!-- Loading Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div
          v-if="isSubmitting"
          class="fixed inset-0 bg-white/75 flex items-center justify-center z-50"
          role="progressbar"
      >
        <FontAwesomeIcon
            icon="fas fa-circle-notch"
            class="text-5xl text-primary-600 animate-spin"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
