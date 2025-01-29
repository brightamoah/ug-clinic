<template>
  <FlexboxLayout flexDirection="row" class="p-4 items-center">
    <!-- Profile Image -->
    <NSImg 
      src="https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1732258031/samples/man-portrait.jpg" 
      class="rounded-full bg-gray-300 w-16 h-16" 
      stretch="aspectFill"
    />
    
    <!-- Info Section -->
    <FlexboxLayout flexDirection="column" class="ml-4 flex-grow">
      <Label 
        text="Ernest Wilson" 
        class="text-xl font-bold text-gray-800"
      />
      <Label 
        text="Radiologist" 
        class="text-base text-gray-500"
      />
    </FlexboxLayout>
    
    <!-- Action Buttons -->
    <FlexboxLayout class="gap-4">
      <Button 
        class="far text-xl p-2" 
        text="&#xf095;" 
        @tap="handleCall"
      />
      <Button 
        class="far text-xl p-2" 
        text="&#xf4ad;" 
        @tap="handleChat"
      />
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script setup lang="ts">
const handleCall = () => {
  console.log('Initiating call...');
  // Implement call functionality
};

const handleChat = () => {
  console.log('Opening chat...');
  // Implement chat functionality
};
</script>

<style scoped>
Button {
  background-color: transparent;
  color: #333;
  border-width: 0;
  min-width: 40;
  min-height: 40;
}
</style>