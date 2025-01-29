<template>
   <Page
      actionBarHidden="true"
      class="bg-gray-100"
   >
      <GridLayout rows="auto, *">
         <!-- Header -->
         <StackLayout
            row="0"
            class="bg-main_blue p-4 rounded-b-3xl"
         >
            <NSLabel
               text="Messages"
               class="text-2xl font-bold text-white ml-4 mb-2"
            />
            <SearchBar
               v-model="searchQuery"
               hint="Search conversations..."
               class="bg-white/20 rounded-full text-white placeholder:text-white/60"
            />
         </StackLayout>

         <!-- Chat List -->
         <ScrollView
            row="1"
            class="mt-4"
         >
            <StackLayout>
               <!-- Online Users -->
               <ScrollView
                  orientation="horizontal"
                  class="mb-4"
               >
                  <FlexboxLayout class="mx-4">
                     <StackLayout
                        v-for="user in onlineUsers"
                        :key="user.id"
                        class="mx-2 items-center"
                     >
                        <GridLayout class="relative">
                           <Image
                              :src="user.avatar"
                              class="w-16 h-16 rounded-full"
                              stretch="aspectFill"
                           />
                           <Label
                              class="w-3 h-3 bg-green-500 rounded-full absolute right-0 bottom-0 border-2 border-white"
                           />
                        </GridLayout>
                        <Label
                           :text="user.name"
                           class="text-sm text-gray-700 mt-1"
                        />
                     </StackLayout>
                  </FlexboxLayout>
               </ScrollView>

               <!-- Chat List -->
               <StackLayout class="mx-4">
                  <GridLayout
                     v-for="chat in filteredChats"
                     :key="chat.id"
                     columns="auto, *, auto"
                     class="mb-4 p-4 bg-white rounded-2xl shadow-sm"
                     @tap="openChat(chat)"
                  >
                     <!-- Avatar -->
                     <GridLayout
                        col="0"
                        class="relative mr-4"
                     >
                        <Image
                           :src="chat.avatar"
                           class="w-14 h-14 rounded-full"
                           stretch="aspectFill"
                        />
                        <Label
                           v-if="chat.unread"
                           class="w-5 h-5 bg-main_blue text-white text-xs rounded-full absolute -right-1 -top-1 text-center"
                           :text="chat.unread.toString()"
                        />
                     </GridLayout>

                     <!-- Chat Info -->
                     <StackLayout col="1">
                        <Label
                           :text="chat.name"
                           class="font-semibold text-gray-800 mb-1"
                        />
                        <Label
                           :text="chat.lastMessage"
                           class="text-sm text-gray-500 text-ellipsis"
                           textWrap="true"
                           maxLines="1"
                        />
                     </StackLayout>

                     <!-- Action Buttons -->
                     <FlexboxLayout
                        col="2"
                        class="items-center"
                     >
                        <Label
                           class="fas text-2xl text-main_blue p-2 mr-2"
                           text="&#xf095;"
                           @tap="makeCall(chat)"
                        />
                        <Label
                           class="fas text-2xl text-main_blue p-2"
                           text="&#xf075;"
                           @tap="openChat(chat)"
                        />
                     </FlexboxLayout>
                  </GridLayout>
               </StackLayout>
            </StackLayout>
         </ScrollView>
      </GridLayout>

      <!-- Floating Action Button -->
      <!-- <GridLayout
         verticalAlignment="bottom"
         horizontalAlignment="right"
         class="m-6"
         rowSpan="2"
      >
         <Label
            class="fas text-2xl text-white bg-main_blue p-4 rounded-full shadow-lg"
            text="&#xf067;"
            @tap="startNewChat"
         />
      </GridLayout> -->
   </Page>
</template>

<script setup lang="ts">
import { ref, computed } from "nativescript-vue";
import { alert } from "@nativescript/core";

interface User {
   id: number;
   name: string;
   avatar: string;
}

interface Chat {
   id: number;
   name: string;
   avatar: string;
   lastMessage: string;
   unread?: number;
   timestamp: Date;
}

// Sample data
const onlineUsers = ref<User[]>([
   {
      id: 1,
      name: "John",
      avatar: "https://i.pravatar.cc/150?img=1",
   },
   {
      id: 2,
      name: "Sarah",
      avatar: "https://i.pravatar.cc/150?img=2",
   },
   {
      id: 3,
      name: "Mike",
      avatar: "https://i.pravatar.cc/150?img=3",
   },
   {
      id: 4,
      name: "Lisa",
      avatar: "https://i.pravatar.cc/150?img=4",
   },
]);

const chats = ref<Chat[]>([
   {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how are you doing?",
      unread: 3,
      timestamp: new Date(),
   },
   {
      id: 2,
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "The meeting is scheduled for tomorrow at 10 AM",
      timestamp: new Date(),
   },
   {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Thanks for your help!",
      unread: 1,
      timestamp: new Date(),
  },
  //add 20
  // more chats...
  // add more chats...
     {
      id: 4,
      name: "John Doe", 
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how are you doing?", 
      timestamp: new Date(),
  },
  {
      id: 5,
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "The meeting is scheduled for tomorrow at 10 AM",
      timestamp: new Date(),
  },
  {
      id: 6,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Thanks for your help!",
      timestamp: new Date(),
  },
  {

      id: 7,
      name: "Lisa Brown",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "I'll be there in 5 minutes",
      timestamp: new Date(),
  },
  {
      id: 8,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how are you doing?",
      timestamp: new Date(),
  },
  {
      id: 9,
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "The meeting is scheduled for tomorrow at 10 AM",
      timestamp: new Date(),
  },
  {
      id: 10,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Thanks for your help!",
    timestamp: new Date(),
  },
  {
      id: 11,
      name: "Lisa Brown",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "I'll be there in 5 minutes",
      timestamp: new Date(),  
}
]);

const searchQuery = ref("");

const filteredChats = computed(() => {
   if (!searchQuery.value) return chats.value;

   return chats.value.filter(
      (chat) =>
         chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
         chat.lastMessage
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
   );
});

const openChat = (chat: Chat) => {
   console.log("Opening chat with:", chat.name);
   // Navigate to individual chat page
   // this.$navigateTo(ChatDetail, { props: { chat } });
};

const makeCall = (chat: Chat) => {
   alert({
      title: "Calling",
      message: `Calling ${chat.name}...`,
      okButtonText: "End Call",
   });
};

const startNewChat = () => {
   console.log("Starting new chat");
   // Navigate to new chat page
   // this.$navigateTo(NewChat);
};
</script>

<style scoped>
.fab {
   elevation: 5;
   ripple-color: #ffffff;
}
</style>
