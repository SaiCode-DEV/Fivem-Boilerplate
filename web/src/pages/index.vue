<template>
  <CenteredLayout>
    <TransparentCard :blur-strength="15" card-class="pa-30">
      <v-card-title class="text-h4"> Boilerplate </v-card-title>

      <v-card-text>
        <HelloWorld />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="elevated" @click="handleClose"> Close </v-btn>
      </v-card-actions>
    </TransparentCard>
  </CenteredLayout>
</template>

<script lang="ts" setup>
import CenteredLayout from '@/components/CenteredLayout.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import TransparentCard from '@/components/TransparentCard.vue';
import { useVisibility } from '../composables';
import { nuiCallback } from '../utils';

const { hide } = useVisibility();

async function handleClose() {
  hide();
  try {
    await nuiCallback('exit');
  } catch (error) {
    console.error('Failed to close UI:', error);
  }
}
</script>
