

<script setup lang="ts">
    import type { Post } from '../../types/post';

    const token = useCookie('auth_token')

    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    async function criarPost() {
        loading.value = true
        try{
            await $fetch(`${config.public.apiBase}/posts/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token.value}` 
                },
                body: { 
                    title : posts.value,
                    description: posts.value
                }
            })
        }catch(error){
            alert("Não foi possível realizar o post")
        }finally{
            loading.value = false
        }
    }

    const config = useRuntimeConfig()
    const { data: posts, error } = await useFetch<Post[], Error, { results: Post[] }>(`${config.public.apiBase}/posts/`, {
        transform: (response) => response.results
    });

    const route = useRoute()
    const page = route.name


</script>


<template>
    <UContainer class="py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Posts</h1>
        
        <UAlert
            v-if="error"
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
            title="Erro ao carregar os posts"
            :description="error.message"
        />

        <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 gap-6">
            <UCard v-for="post in posts" :key="post.id" class="bg-sky-600 dark:bg-black-200">
                <template #header>
                    <div class="flex flex-col">
                        <UBadge color="gray" variant="solid" class="mt-1 w-fit">{{ post.owner }}</UBadge>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ post.title }}</h3>                     
                    </div>
                </template>
                
                <p class="text-gray-700 dark:text-gray-300">
                        {{ post.description }}
                </p>

                <template #footer>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Criado em: {{ post.created }}</p>
                </template>
            </UCard>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2>Carregando...</h2>
        </div>
        
        
    </UContainer>
</template>