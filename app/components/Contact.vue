<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import {useSiteData} from "~/composables/useSiteData"
import {useContactData} from "~/composables/useContactData";
import Spinner from "~/components/common/Spinner.vue";
import Success from "~/components/common/Success.vue";
import ContactForm from "~/components/common/ContactForm.vue";
/*import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha";*/
import {useReCaptcha} from 'vue-recaptcha-v3';
import type {GoogleRecaptchaResponse} from "~/models/types/google-recaptcha-response";

const config = useRuntimeConfig()
const apiKey = config.public.googleMapsApiKey
const apiUrl = config.public.apiUrl

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();
  // get the token, a custom action could be added as argument to the method
  return recaptchaInstance?.executeRecaptcha('submitForm');
};

// If you need to expose the method to a template or parent component
defineExpose({
  recaptcha
});

// const { executeRecaptcha } = useGoogleRecaptcha();
const { contact } = useContactData()
const { getEmailByAccount } = useSiteData()
const email = getEmailByAccount('support')

interface FormData {
  name: string,
  subject: string,
  email: string,
  message: string,
  token: string | undefined,
}

const showSpinner = shallowRef(false);
const showSuccess = shallowRef(false);
const showForm = computed(() => !showSuccess.value && !showSpinner.value);

const getInitialFormData = (): FormData => ({
  name: "",
  subject: "",
  email: "",
  message: "",
  token: "",
});

const form = ref<FormData>(getInitialFormData());

const resetForm = () => {
  form.value = getInitialFormData();
};

const isFormValid = computed(() => {
  return form.value.name.trim() &&
      form.value.email.trim() &&
      form.value.subject.trim() &&
      form.value.message.trim();
});

const submitForm = async () => {
  showSpinner.value = true
  // validate
  if (!isFormValid) {
    showSpinner.value = false
    return;
  }
  try{
    //const { token } = await executeRecaptcha(RecaptchaAction.login);
    const token = await recaptcha();
    console.log(`token: ${token}`);
    const verificationResponse = await useApi<GoogleRecaptchaResponse>('/api/recaptcha', {
      method: 'POST',
      body: {
        token
      }
    })
    console.log(`verificationResponse:`, verificationResponse);

    if (!verificationResponse.success) {
      throw new Error('reCAPTCHA verification failed');
    }

    const response = await fetch(`${apiUrl}/contact-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    } )
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    resetForm()
    showSpinner.value = false
    showSuccess.value = true
  } catch (e) {
    console.log(e);
    showSpinner.value = false
  }
}
const clearSuccess = () => {
  resetForm()
  showSuccess.value=false
}
</script>

<template>
  <section id="contact" class="bg-white dark:bg-gray-900">
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-primary dark:text-tertiary">{{ contact.title }}</h2>
      <p v-for="content in contact.content" class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl" v-html="content"></p>
      <Spinner v-if="showSpinner" />

      <ContactForm
          v-if="showForm"
          v-model:name.trim="form.name"
          v-model:email.trim="form.email"
          v-model:subject.trim="form.subject"
          v-model:message.trim="form.message"
          @submit="submitForm"
      />

      <Success @updateClearSuccess="clearSuccess"
               v-if="showSuccess" />
    </div>
  </section>
</template>

<style scoped>

</style>
