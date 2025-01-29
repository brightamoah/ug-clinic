<template>
  <Button
    text="Book Appointment"
    class="booking-button"
    @tap="$emit('tap')"
  />
</template>

<style scoped>
.booking-button {
  background-color: #4285f4;
  color: #ffffff;
  border-radius: 25;
  height: 50;
  margin-top: 20;
}
</style>s