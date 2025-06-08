<template>
  <q-page class="flex flex-center" style="background: #f5f6fa; min-height: 100vh;">
    <div style="width: 100%; max-width: 1200px; padding: 32px; display: flex; flex-direction: column; gap: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 28px; font-weight: 600; color: #101828; line-height: 28px; font-family: 'Poppins', sans-serif;">{{ chatStore.currentChannel?.name || '채팅방' }}</div>
        <q-btn
          label="뒤로가기"
          color="primary"
          style="height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #3567E9; font-family: 'Poppins', sans-serif;"
          text-color="#FCFCFD"
          @click="goBack"
        />
      </div>
      <div style="display: flex; flex-direction: column; gap: 24px; flex: 1;">
        <div style="display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto;">
          <div
            v-for="message in chatStore.messages"
            :key="message.messageId"
            style="display: flex; flex-direction: column; gap: 8px;"
          >
            <div style="font-size: 14px; color: #667085; line-height: 14px; font-family: 'Poppins', sans-serif;">{{ message.sender.nickname }}</div>
            <div style="font-size: 16px; color: #101828; line-height: 16px; font-family: 'Poppins', sans-serif;">{{ message.message }}</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <q-input
            v-model="newMessage"
            outlined
            dense
            placeholder="메시지를 입력하세요"
            style="flex: 1; border-radius: 8px; outline: 1px #D0D5DD solid; outline-offset: -1px; font-family: 'Poppins', sans-serif;"
            input-style="font-size: 14px; color: #98A2B3; font-family: 'Poppins', sans-serif;"
            @keyup.enter="sendMessage"
          />
          <q-btn
            label="전송"
            color="primary"
            style="height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #3567E9; font-family: 'Poppins', sans-serif;"
            text-color="#FCFCFD"
            @click="sendMessage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useChatStore } from '../stores/chat'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()
const newMessage = ref('')

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  if (!chatStore.isConnected) {
    await chatStore.connect(userStore.username)
  }
  const channelUrl = route.params.channelUrl
  await chatStore.enterChannel(channelUrl)
})

function goBack() {
  router.back()
}

async function sendMessage() {
  if (!newMessage.value) return
  await chatStore.sendMessage(newMessage.value)
  newMessage.value = ''
}
</script> 