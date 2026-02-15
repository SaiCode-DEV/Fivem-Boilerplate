<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to my</div>

      <h1 class="text-h2 font-weight-bold">Boilerplate</h1>

      <div class="py-14" />
      <div class="text-center mt-4">
        <p class="text-h6">Counter: {{ counter }}</p>
      </div>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Components
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
            @click="handleIncrement"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-github"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useNuiEvent } from '../composables';
  import { nuiCallback } from '../utils';

  const counter = ref(0);
  async function handleIncrement () {
    try {
      await nuiCallback('incrementCounter');
    } catch (error) {
      console.error('Failed to increment counter:', error);
    }
  }

  async function loadCounter () {
    try {
      await nuiCallback('getCounter');
    } catch (error) {
      console.error('Failed to load counter:', error);
    }
  }

  useNuiEvent('updateCounter', (data: { counter: number }) => {
    counter.value = data.counter;
  });

  onMounted(() => {
    loadCounter();
  });
</script>
