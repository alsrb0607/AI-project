<template>
  <q-btn
    color="primary"
    flat
    rounded
    dense
    no-caps
  />
</template>

<script>
import useGoBack from 'src/use/useGoBack'
import { useRouter } from 'vue-router'
import {ref} from 'vue'

export default {
  name: 'PageHeaderBtnBookmark',
  setup() {
    const $router = useRouter()
    const bookmarks = ref(false)

    function bookmark () {
      bookmarks.value = !bookmarks.value
      console.log(bookmarks.value)
    }
    return {
      useGoBack,
      bookmark,
      bookmarks
    }
  }
}
</script>