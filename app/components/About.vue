<script setup lang="ts">
import { useAboutUsData } from "~/composables/useAboutUsData";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const { about } = useAboutUsData();
</script>

<template>
  <section id="about" class="p-4 text-gray-600">
    <div class="w-2/3 mx-auto my-8">
      <h1 class="mb-8 text-center text-3xl font-bold text-tertiary">{{  about.title }}</h1>

      <p v-for="content in about.content" class="mb-12 text-slate-50 font-light" v-html="content"></p>

      <ul class="grid place-content-center sm:grid-cols-2 gap-8">
        <template v-for="(item, index) in about.mission">
          <ClientOnly fallback-tag="span" fallback="Loading mission...">
          <li class="flex">
            <div class="px-4 text-5xl font-extralight text-tertiary">
                <font-awesome-icon icon="fas fa-check" class="text-primary"/>
            </div>
            <div>
              <div class="text-xl font-bold text-tertiary">{{ item.title }}</div>
              <p class="max-w-xs py-2 text-sm text-tertiary">{{ item.content }}</p>
            </div>
          </li>
          </ClientOnly>
        </template>
      </ul>
    </div>
  </section>
</template>

<style scoped>

</style>
