<template>
  <centered-layout>
    <transparent-card blur-strength="15" card-class="pa-30">
      <v-card-title class="text-h4">
        Test Page 2
      </v-card-title>

      <v-card-text>
        Totally not a copy of the index page, nope.
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn prepend-icon="mdi-arrow-left" to="/" variant="elevated">
          Go Back
        </v-btn>
        <v-btn color="primary" variant="elevated" @click="handleClose">
          Close
        </v-btn>
      </v-card-actions>
    </transparent-card>
  </centered-layout>
</template>

<script lang="ts" setup>
  import CenteredLayout from '@/components/CenteredLayout.vue';
  import TransparentCard from '@/components/TransparentCard.vue';
  import { useVisibility } from '../composables';
  import { nuiCallback } from '../utils';

  const { hide } = useVisibility();

  async function handleClose () {
    hide();
    try {
      await nuiCallback('exit');
    } catch (error) {
      console.error('Failed to close UI:', error);
    }
  }
</script>
