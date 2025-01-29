<template>
  <GridLayout class="items-center p-3">
    <!-- Shield Image and Text Container -->
    <FlexboxLayout class="items-center space-x-3">
      <!-- Shield Image -->
      <NSImg src="~/assets/images/UoG.png" 
             class="w-16 h-16" />
             
      <!-- Text Section -->
      <FlexboxLayout class="items-center">
        <Label text="UG" 
               class="text-2xl font-bold text-blue-900" />
        <!-- Vertical Divider -->
        <StackLayout class="w-[5px] h-6 bg-blue-900 font-extrabold mx-3" />
        <Label text="CLINIC" 
               class="text-2xl font-bold text-blue-900" />
      </FlexboxLayout>
    </FlexboxLayout>
  </GridLayout>
</template>

<script setup>
// No additional script needed for this static component
</script>