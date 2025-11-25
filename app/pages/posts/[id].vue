<script setup lang="ts">

    const route = useRoute()
    const id = route.params.id
</script>


<template>

  <div>
    

      <h1>Welcome to the {{ id }} POSTS page</h1>
      <AppAlert>
        This is an auto-imported component
      </AppAlert>
      
      <NuxtLink to="../">INDEX</NuxtLink>
    
  </div>
</template>
