<script setup lang="ts">
import { useSiteData } from "~/composables/useSiteData"
import LogoSrc from "/public/logo/logo-1.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { site } = useSiteData()
const date = new Date();
const currentYear = date.getFullYear();
</script>

<template>
  <footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="#" class="flex items-center">
            <img src="/logo/logo-1.svg" class="h-8 me-3" alt="Find Local Haunts Logo" />
            <span class="font-another-danger text-secondary self-center text-2xl font-semibold whitespace-nowrap dark:text-light">Find Local Haunts</span>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <template v-for="(link, index) in site.social_links">
                <li :class="{ 'mb-4': index < site.social_links.length - 1 }">
                  <NuxtLink :to="link.href"
                            :title="link.label"
                            external
                            target="_blank"
                            noreferrer
                            class="hover:underline ">{{ link.display_title }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <template v-for="(link, index) in site.footer_links">
                <li :class="{ 'mb-4': index < site.footer_links.length - 1 }">
                  <NuxtLink :to="link.to"
                            :title="link.title"
                            :external="link.external"
                            class="hover:underline">{{ link.displayText }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ site.established }} - {{ currentYear }} <a href="#" class="hover:underline">Find Local Haunts</a>. All Rights Reserved.
          </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <template v-for="(link, index) in site.social_links">
            <ClientOnly fallback-tag="span" fallback="Loading mission...">
              <NuxtLink :to="link.href"
                        :title="link.label"
                        external
                        target="_blank"
                        noreferrer
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        :class="{ 'ms-5': index > 0}">
                <font-awesome-icon :icon="link.icon"/>
                <span class="sr-only">{{  link.display_title }}</span>
              </NuxtLink>
            </ClientOnly>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
