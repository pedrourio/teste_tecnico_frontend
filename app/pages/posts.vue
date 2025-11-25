

<script setup lang="ts">
    import { description } from 'valibot';
import type { Post } from '../../types/post';
    import type { User } from '../../types/user';

    const router = useRouter()

    const token = useCookie('auth_token')

    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const isOpen = ref(false)

    const title =  ref('')
    const description = ref('')
    const state = reactive({
        title: title,
        description: description
    })
    

    const toast = useToast()
    

    async function criarPost() {
        loading.value = true
        try{
            console.log('Sending token:', token.value)
            const headers = {
                Authorization: `Token ${token.value}` 
            }
            console.log('Request headers:', headers)
            await $fetch(`${config.public.apiBase}/posts/`, {
                method: 'POST',
                headers: headers,
                body: { 
                    title : title.value,
                    description: description.value
                }
            })
            isOpen.value = false
        }catch(error: any){
            console.error('Error creating post:', error)
            const errorMessage = error.data?.detail || 'Não foi possível realizar o post'
            toast.add({ title: 'Error', description: errorMessage})
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

        <template>
            <div>
                

                <Teleport to="body">
                <UForm>
                <div 
                    v-if="isOpen" 
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    @click="isOpen = false"
                >
                    
                    <div 
                    class="bg-white dark:bg-sky-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative"
                    @click.stop
                    >
                    
                    <div class="flex justify-between items-center mb-4 border-b border-sky-200 dark:border-gray-700 pb-2">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Criar Conteúdo</h3>
                        <UButton @click="isOpen = false" class="text-sky-500 hover:text-red-500">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </UButton>
                    </div>

                    <div class="mb-6">
                        <UFormField :v-model="title" type="text" placeholder="title" class="block mb-2 text-sm font-medium text-sky-900 dark:text-white">
                            <UInput type="text" class="border rounded w-full p-2 dark:bg-sky-500 dark:border-gray-600" placeholder="Digite o título..."/>
                        </UFormField>
                        <UFormField v-model="description" type="textfield" placeholder="Descrição" class="block mt-4 mb-2 text-sm font-medium text-sky-900 dark:text-white">
                            <UInput class="border rounded w-full p-2 dark:bg-sky-500 dark:border-gray-600" rows="3"  placeholder="Digite a descrição..."/>
                        </UFormField>
                    </div>

                    <div class="flex justify-end gap-2 pt-2">
                        <UButton 
                            @click="isOpen = false"
                            class="px-4 py-2 text-sky-700 bg-sky-100 rounded hover:bg-red-400 dark:bg-sky-700 dark:text-white"
                        >
                        Cancelar
                        </UButton>
                        <UButton 
                            class="px-4 py-2 text-white bg-sky-600 rounded hover:bg-blue-700"
                            @click="criarPost"
                        >
                        Salvar
                        </UButton>
                    </div>

                    </div>
                </div>
                </UForm>
                </Teleport>
            </div>
        </template>

        <UButton label="Criar Post" @click="isOpen = true" />
        <template v-if="user">
            <UButton @click="logout" variant="soft" class="bg-sky-300 border">
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