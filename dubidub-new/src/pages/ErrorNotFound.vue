<template>
  <q-page class="flex flex-center" style="background: #f5f6fa; min-height: 100vh;">
    <div style="text-align: center;">
      <div style="font-size: 48px; font-weight: 600; color: #101828; margin-bottom: 16px; font-family: 'Poppins', sans-serif;">404</div>
      <div style="font-size: 24px; color: #667085; margin-bottom: 32px; font-family: 'Poppins', sans-serif;">페이지를 찾을 수 없습니다</div>
      <q-btn
        label="홈으로 돌아가기"
        color="primary"
        style="height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #3567E9; font-family: 'Poppins', sans-serif;"
        text-color="#FCFCFD"
        @click="goHome"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/login')
}
</script>
