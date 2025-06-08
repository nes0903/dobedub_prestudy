<template>
  <q-page class="flex flex-center" style="background: #f5f6fa; min-height: 100vh;">
    <div style="width: 400px; border-radius: 10px; background: #fff; box-shadow: 0 2px 16px #0001; padding: 32px; display: flex; flex-direction: column; gap: 32px;">
      <div>
        <div style="font-size: 28px; font-weight: 600; color: #101828; line-height: 28px; font-family: 'Poppins', sans-serif;">Login</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="font-size: 16px; color: #344054; font-weight: 400; margin-bottom: 12px; font-family: 'Poppins', sans-serif;">ID (E-mail)</div>
          <q-input
            v-model="username"
            outlined
            dense
            placeholder="이메일(아이디)을 입력해 주세요."
            style="border-radius: 8px; outline: 3px #FFD1D1 solid; outline-offset: -1.5px; font-family: 'Poppins', sans-serif;"
            input-style="font-size: 14px; color: #98A2B3; font-family: 'Poppins', sans-serif;"
          />
        </div>
        <div>
          <div style="font-size: 16px; color: #344054; font-weight: 400; margin-bottom: 12px; font-family: 'Poppins', sans-serif;">Password</div>
          <q-input
            v-model="password"
            type="password"
            outlined
            dense
            placeholder="비밀번호"
            style="border-radius: 8px; outline: 1px #D0D5DD solid; outline-offset: -1px; font-family: 'Poppins', sans-serif;"
            input-style="font-size: 14px; color: #98A2B3; font-family: 'Poppins', sans-serif;"
          />
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="padding: 16px; background: #E5E5EA; border-radius: 8px; text-align: center; color: #8E8E93; font-size: 16px; font-weight: 600; font-family: 'Poppins', sans-serif;">
          로그인
        </div>
        <q-btn
          label="로그인"
          color="primary"
          style="width: 100%; height: 48px; border-radius: 8px; font-size: 16px; font-weight: 600; background: #3567E9; font-family: 'Poppins', sans-serif;"
          text-color="#FCFCFD"
          @click="onLogin"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

function onLogin() {
  let role = 'user'
  if (username.value === 'admin') {
    role = 'admin'
  } else if (username.value.startsWith('creator')) {
    role = 'creator'
  }
  userStore.login(username.value, role)
  if (role === 'admin') {
    router.push('/admin')
  } else if (role === 'creator') {
    router.push('/creator')
  } else {
    router.push('/user')
  }
}
</script> 