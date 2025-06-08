<template>
  <q-page class="flex flex-center" style="background: #f5f6fa; min-height: 100vh;">
    <div style="width: 100%; max-width: 1200px; padding: 32px; display: flex; flex-direction: column; gap: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 28px; font-weight: 600; color: #101828; line-height: 28px; font-family: 'Poppins', sans-serif;">Creator Home</div>
        <q-btn
          label="로그아웃"
          color="negative"
          style="height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #F04438; font-family: 'Poppins', sans-serif;"
          text-color="#FCFCFD"
          @click="onLogout"
        />
      </div>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="font-size: 20px; font-weight: 600; color: #101828; line-height: 20px; font-family: 'Poppins', sans-serif;">채팅방 목록</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
          <div
            v-for="channel in chatStore.channels"
            :key="channel.url"
            style="background: #fff; border-radius: 10px; padding: 24px; box-shadow: 0 2px 16px #0001; cursor: pointer;"
            @click="enterChannel(channel.url)"
          >
            <div style="font-size: 18px; font-weight: 600; color: #101828; line-height: 18px; margin-bottom: 16px; font-family: 'Poppins', sans-serif;">{{ channel.name }}</div>
            <div style="font-size: 14px; color: #667085; line-height: 14px; font-family: 'Poppins', sans-serif;">참여자: {{ channel.memberCount }}명</div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="font-size: 20px; font-weight: 600; color: #101828; line-height: 20px; font-family: 'Poppins', sans-serif;">새 채팅방 만들기</div>
        <div style="display: flex; gap: 16px;">
          <q-input
            v-model="newChannelName"
            outlined
            dense
            placeholder="채팅방 이름"
            style="flex: 1; border-radius: 8px; outline: 1px #D0D5DD solid; outline-offset: -1px; font-family: 'Poppins', sans-serif;"
            input-style="font-size: 14px; color: #98A2B3; font-family: 'Poppins', sans-serif;"
          />
          <q-btn
            label="생성"
            color="primary"
            style="height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #3567E9; font-family: 'Poppins', sans-serif;"
            text-color="#FCFCFD"
            @click="createChannel"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useChatStore } from '../stores/chat'

const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()
const newChannelName = ref('')

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  await chatStore.connect(userStore.username)
  await chatStore.loadChannels()
})

function onLogout() {
  userStore.logout()
  router.push('/login')
}

async function createChannel() {
  if (!newChannelName.value) return
  await chatStore.createChannel(newChannelName.value, [userStore.username])
  newChannelName.value = ''
  await chatStore.loadChannels()
}

function enterChannel(channelUrl) {
  router.push(`/chat/${channelUrl}`)
}
</script> 