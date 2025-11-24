<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

definePageMeta({
  layout: 'login'
})

const schema = v.object({
  username: v.pipe(v.string(), v.minLength(1, 'Please enter your username')),
  password: v.pipe(v.string(), v.minLength(3, 'Password must be at least 3 characters'))
})

type Schema = v.InferOutput<typeof schema>

// Reverted to individual refs as per user preference.
const username = ref('')
const password = ref('')

// This state object is now only for validation purposes, linked to the refs.
const state = reactive({
  username: username,
  password: password
})

const loading = ref(false)
const tokenCookie = useCookie('auth_token')
const toast = useToast()
const router = useRouter()
const config = useRuntimeConfig()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const data: { token: string } = await $fetch(`${config.public.apiBase}/api-token-auth/`, {
      method: 'POST',
      headers: {
        'Content-type': 'aaplication/json',
        'auth_token' : tokenCookie.value
      },
      body: {
        username: username.value,
        password: password.value,
      },
    })

    tokenCookie.value = data.token
    toast.add({ title: 'Success', description: 'Login successful!', color: 'green' })
    
    router.push('/posts')

  } catch (error: any) {
    // Kept the improved error message handling.
    const errorMessage = error.data?.non_field_errors?.[0] || 'Username or password incorrect.'
    toast.add({ title: 'Error', description: errorMessage, color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- Kept the improved centered layout -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Username" name="username">
          <!-- Reverted v-model to individual ref -->
          <UInput v-model="username" placeholder="Usuário" icon="i-heroicons-user" size="lg" />
        </UFormField>

        <UFormField label="Password" name="password">
          <!-- Reverted v-model to individual ref -->
          <UInput v-model="password" type="password" placeholder="Senha" icon="i-heroicons-lock-closed" size="lg" />
        </UFormField>

        <UButton type="submit" :loading="loading" block label="Submit" size="lg" />
      </UForm>
    </div>
  </div>
</template>
