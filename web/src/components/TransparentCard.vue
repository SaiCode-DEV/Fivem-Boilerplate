<template>
  <div class="glass-card" :data-blur-strength="blurStrength" data-hlsl>
    <v-card class="transparent-card" :class="cardClass" elevation="0">
      <slot />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    blurStrength?: number
    cardClass?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    blurStrength: 15,
    cardClass: '',
  });
</script>

<style scoped>
  .glass-card {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    padding: 0;
  }

  .transparent-card {
    background: transparent !important;
  }
</style>
