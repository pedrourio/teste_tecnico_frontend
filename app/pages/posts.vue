

<script setup lang="ts">
    import type { Post } from '../../types/post';
    import type { User } from '../../types/user';

    const router = useRouter()

    const token = useCookie('auth_token')

    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const modal_is_open = ref(false)

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
    const user = ref<User | null>(null);

    
    if (token.value) {
        const { data: userData } = await useFetch<User>(`${config.public.apiBase}/users/me/`, {
        headers: {
            'Authorization': `Token ${token.value}`
        },
        onError: () => {
            
            user.value = null;
        }
        });
        if (userData.value) {
        user.value = userData.value;
        }
    }

    const route = useRoute()
    const page = route.name



    function logout() {
        token.value = null; 
        router.push('/login'); 
    }

</script>


<template>
    <UContainer class="py-8">
        <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Conteúdos para {{ user?.username || 'Visitante' }}
        </h1>

        <UButton @click="modal_is_open = true">Criar Post</UButton>
        <UModal v-model:open="modal_is_open" title="Criar conteúdo">
            <template #body class="bg-sky-100">
                <div class="h-48 m-4 bg-sky-100 rounded flex items-center justify-center">
                    <span class="text-sky-800">Form POST /posts</span>
                </div>
            </template>
            <template #footer>
                <UButton label="Cancelar" @click="modal_is_open = false" />
            </template>
        </UModal>


        <template v-if="user">
        <UButton @click="logout" variant="soft" class="bg-red-300">
            Sair
        </UButton>
        </template>
        <template v-else>
        <UButton to="/login" color="primary">
            Login
        </UButton>
        </template>
    </div>
        
        <UAlert
            v-if="error"
            icon="i-heroicons-exclamation-triangle"
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