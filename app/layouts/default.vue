<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-light dark:bg-dark text-dark dark:text-light'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      href: '/android-chrome-512x512.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    }
  ]
})
</script>

<template>
    <CommonNavigation />
    <slot></slot>
    <CommonFooter />
</template>

<style scoped>

</style>
