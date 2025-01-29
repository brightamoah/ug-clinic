<template>
  <FlexboxLayout class="header">
    <NSLabel @tap="goBack" class="back-button" text="←" />
    <NSLabel :text="title" class="title" />
  </FlexboxLayout>
</template>

<script setup>
import { Frame } from '@nativescript/core';

defineProps({
  title: {
    type: String,
    required: true
  }
});

const goBack = () => {
  Frame.topmost().goBack();
};
</script>

<style scoped>
.header {
  padding: 16;
  color: #ffffff;
}

.back-button {
  font-size: 24;
  width: 40;
}

.title {
  font-size: 20;
  font-weight: bold;
}
</style>