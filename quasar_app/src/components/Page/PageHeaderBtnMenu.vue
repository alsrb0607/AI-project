<!-- 아이콘 이름은 https://fonts.google.com/icons에서 따온다. -->
<template>
  <div>
  <q-btn
    flat round dense icon="menu"
    color="primary"
    rounded
    no-caps
    @click="drawerRight = !drawerRight"
  />
  <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list>
              <div v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable v-ripple @click="menuRoute(index)">
                <q-item-section avatar>
                  <q-icon :class="menuItem.color" :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ $t(menuItem.label) }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'PageHeaderBtnMenu',
  setup() {
    // $는 자바스크립트 내장 함수를 쓰겠다는 의미
    const $router = useRouter()
    function goHome() {
    $router.push('/home') // 히스토리가 쌓임 -> 뒤로가기 가능
    // $router.replace('/home') 히스토리가 쌓이지 않음
    // $router.go('/home') 해당 페이지로 이동하면서, 리프레시
    }
    function menuRoute(index){
      if (index===0) {
        $router.push('/home')
      }
      else if (index===1) {
        $router.push('/xrays')
      }
      else if (index===2) {
        $router.push('/brains')
      }
      else if (index===3) {
        $router.push('/skins')
      }
      else if (index===4) {
        $router.push('/settings')
      }
      else if (index===5) {
        $router.push('/notice')
      }
      else if (index===6) {
        $router.push('/bookmarks')
      }
      else if (index===7) {
        $router.push('/info')
      }
    }

    const menuList = [
  {
    icon: 'home',
    label:  "menu_home",
    separator: true,
    color: "text-grey-14"
  },
  {
    icon: 'las la-x-ray',
    label: 'menu_chest',
    separator: false,
    color: "text-primary"
  },
  {
    icon: 'las la-brain',
    label: 'menu_brain',
    separator: false,
    color: "text-primary"
  },
  {
    icon: 'las la-allergies',
    label: 'menu_skin',
    separator: true,
    color: "text-primary"
  },
  {
    icon: 'settings',
    label: 'menu_setting',
    separator: false,
    color: "text-grey-14"
  },
  {
    icon: 'feedback',
    label: 'menu_notice',
    separator: false,
    color: "text-grey-14"
  },
  {
    icon: 'bookmark',
    iconColor: 'primary',
    label: 'menu_bookmark',
    separator: false,
    color: "text-grey-14"
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'menu_help',
    separator: false,
    color: "text-grey-14"
  }
]
    return {
      drawerRight: ref(false),
      menuList,
      menuRoute
    }
  }
}
</script>