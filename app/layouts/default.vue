<template >
  <div class="flex flex-col h-1">
    <AppHeader />

    <div class="flex flex-row w-1/1">
      <div class="bg-teal-300 w-1/5">
        <h1>Coluna esquerda</h1>
      </div>
      <div class="bg-teal-600 w-4/5" >
        <slot />
      </div>
    </div>
    
      <AppFooter>
      <h1>AAAAAAAAAA</h1>
    </AppFooter>
    
  </div>
</template>