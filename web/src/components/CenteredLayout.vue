<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :cols="cols" :lg="lg" :md="md">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
interface Props {
  cols?: number | string;
  lg?: number | string;
  md?: number | string;
}

const _props = withDefaults(defineProps<Props>(), {
  cols: 12,
  lg: 6,
  md: 8,
});
</script>
