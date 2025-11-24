<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

definePageMeta({
  layout: 'login'
})

const schema = v.object({
  username: v.pipe(v.string(), v.minLength(1, 'Insira o nome')),
  password: v.pipe(v.string(), v.minLength(5, '5 caracteres necessários na senha'))
})

type Schema = v.InferOutput<typeof schema>


const username = ref('')
const password = ref('')



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
      
      body: {
        username: username.value,
        password: password.value,
      },
    })

    tokenCookie.value = data.token
    toast.add({ title: 'Success', description: 'Login successful!' })
    
    router.push('/posts')

  } catch (error: any) {
    const errorMessage = error.data?.non_field_errors?.[0] || 'Username or password incorrect.'
    toast.add({ title: 'Error', description: errorMessage})
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class=" flex items-center justify-center">
    <div class="w-full">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Senha" name="username">
          <UInput v-model="username" placeholder="Usuário" icon="i-heroicons-user" size="lg" />
        </UFormField>

        <UFormField label="Senha" name="password">
          <UInput v-model="password" type="password" placeholder="Senha" icon="i-heroicons-lock-closed" size="lg" />
        </UFormField>

        <UButton type="submit" :loading="loading" block label="Submit" size="lg" >Entrar</UButton>
        <UButton to="/posts" variant="link" :padded="false" class="mt-10 flex justify-center" style="width: 100%;">Sem login</UButton>
      </UForm>

      
    </div>
  </div>
</template>
