<template >
  <div class="flex flex-col h-1">
    <AppHeader/>

    <div class="flex flex-row w-1/1">
      <div class="bg-sky-200 w-1/5">
      </div>
      <div class="bg-sky-200 w-4/5" >
        <slot />
      </div>
    </div>
    
      <AppFooter>
      
    </AppFooter>
    
  </div>
</template>
