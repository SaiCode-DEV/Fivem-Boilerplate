<template>
  <v-app v-if="isVisible || isDevelopment()">
    <v-main>
      {{ router.currentRoute.value.path }}
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useVisibility } from './composables';
import router from './router';
import { isDevelopment } from './utils';

const { isVisible } = useVisibility();
</script>
