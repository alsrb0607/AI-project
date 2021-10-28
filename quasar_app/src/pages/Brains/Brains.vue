<template>
  <page>
    <page-header>
      <template #buttons-home>
        <page-header-btn-home
          label=""
        />
      </template>
      <template #title >{{ $t('title_brains') }}</template>
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
          class="bg-primary text-grey-5 shadow-2"
          align="justify"
          indicator-color="transparent"
          active-color="white"
        >
          <q-tab name="진단 대기" :label="$t('tab_btn_wait')" />
          <q-tab name="진단 완료" :label="$t('tab_btn_complete')" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" >
          <q-tab-panel name="진단 대기">
            <div class="row">
              <router-link
          v-for="image in brainList.filter(image => image.detect === false)"
          :key="image.id"
          :to="`/brains/${ image.id }`"
          class="col-6"
        >
          <q-img
            :src="image.url"
            :ratio="1"
          >
            <div class="absolute-top text-center">
             {{$t("detect_caption")}} {{ image.caption}}
            </div>
          </q-img>
        </router-link>

            </div>
          </q-tab-panel>

          <q-tab-panel name="진단 완료">
            <div class="row">
              <router-link
          v-for="image in brainList.filter(image => image.detect === true)"
          :key="image.id"
          :to="`/brains/${ image.id }`"
          class="col-6"
        >
          <q-img
            :src="image.url"
            :ratio="1"
          >
            <div class="absolute-top text-center">
            {{$t("detect_caption")}}  {{ image.caption}}
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
import { onActivated, onDeactivated, ref, reactive, onUpdated } from 'vue'
import { useQuasar } from 'quasar'
import { axios, apiDB } from 'boot/axios'
import DBs from 'src/doctorStore/MongoDB.js'


export default {
  name: 'Brains',
  setup() {
    var brainList = ref([])

    onActivated(() => {
      getValues()
      // console.log(brainList.value)
    })
    onUpdated(() => {
      getValues()
    })

    onDeactivated(() => {
    })

    async function getValues() {
      try{
        brainList.value =  await DBs.getList('brain') 
      } catch (e) {
        console.log('error', e)
      }    
      
    }
    

    const tab = ref('진단 대기')

    return {
      slide: ref(1),
      tab,
      brainList,
      
    }
  }
}
</script>