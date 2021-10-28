<template>
  <page>
    <page-header>
      <template #buttons-home>
        <page-header-btn-home
          label=""
        />
      </template>
      <template #title >뇌 CT</template>
      <template #buttons-menu>
        <page-header-btn-menu
        />
      </template>
    </page-header>
    <page-body>
      <div class="q-gutter-y-md" style="max-width: 600px">
        <q-card>
        <q-tabs
          v-model="tab"
          class="bg-teal text-grey-5 shadow-2"
          align="justify"
          indicator-color="transparent"
          active-color="white"
        >
          <q-tab name="진단 대기" label="진단 대기" />
          <q-tab name="진단 완료" label="진단 완료" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" >
          <q-tab-panel name="진단 대기">
            <div class="row">
              <router-link
          v-for="image in storeBrain.state.images.filter(image => image.detect === false)"
          :key="image.id"
          :to="`/brains/${ image.id }`"
          class="col-6"
        >
          <q-img
            :src="image.url"
            :ratio="1"
          >
            <div class="absolute-top text-center">
              {{ image.caption}}}
            </div>
          </q-img>
        </router-link>

            </div>
          </q-tab-panel>

          <q-tab-panel name="진단 완료">
            <div class="row">
              <router-link
          v-for="image in storeBrain.state.images.filter(image => image.detect === true)"
          :key="image.id"
          :to="`/brains/${ image.id }`"
          class="col-6"
        >
          <q-img
            :src="image.url"
            :ratio="1"
          >
            <div class="absolute-top text-center">
              {{ image.caption}}}
            </div>
          </q-img>
        </router-link>

            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </div>

    </page-body>
  </page>
</template>

<script>
import storeBrain from 'src/doctorStore/brain.js'
import { onActivated, onDeactivated, ref } from 'vue'
import { useQuasar } from 'quasar'


export default {
  name: 'Brains',
  setup() {
    
    function saveLocal(){
      $q.localStorage.set(1, "테스트")
    }

    function getLocal() {
      const value = $q.localStorage.getItem(1)
      console.log("불러오기", value)
    }

    const tab = ref('진단 대기')

    return {
      storeBrain,
      slide: ref(1),
      saveLocal,
      getLocal,
      tab,
      
    }
  }
}
</script>
