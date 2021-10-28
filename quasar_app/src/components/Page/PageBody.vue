<template>
  <q-scroll-area class="page-body absolute-top fit">

    <div class="page-body-spacer-header"></div>
    
    <slot />


  </q-scroll-area>
</template>

<script>
export default {
  name: 'PageBody'
}
</script>