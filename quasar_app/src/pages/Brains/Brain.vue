<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label=""
        />
      </template>
      <template #title>{{ $t('title_brain') }}</template>
      <template #buttons-right>
        <page-header-btn-bookmark
        @click="bookmark"
        :icon="bookmarks? 'bookmark' : 'bookmark_border'"
        />
      </template>
      <template #buttons-menu>
        <page-header-btn-menu
        />
      </template>
    </page-header>
    <page-body>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <!-- 진단할 이미지 -->
        <div
          v-if="image"
          class="row justify-center"
        >
          <div class="text-h5 q-mb-md">{{$t("detect_caption")}}{{ image.caption }}</div>
            
            <q-img
              :src="image.url"
              class="no-pointer-events"
              no-transition
              no-spinner
              style="width:380px"
              >
            </q-img>
          
          
          <div class="q-pa-lg">
            <q-btn 
              class="btn-fixed-width"
              color="primary" 
              :label="$t('detect_btn_detect')"
              @click="loadData" 
          />
          </div>

          <!-- 진단 결과 -->
          <div
            v-if="data"
            class="row justify-center"
          >
            <div class="text-h6 q-mb-md">{{ $t("detect_diagnosis") }}: {{ $t(data.diagnosis) }} <br/>
            {{ $t("detect_age") }}: {{ image.age }} <br/>{{ $t("detect_date_ct") }} : {{ image.date }}</div>
            <div 
            v-if="data.img_url"
            class="q-mb-md">
            <q-img
              :src="data.img_url"
              no-transition
              no-spinner
              style="width:380px"
              @click="imagePopup(data.img_url)"
            >
            </q-img>
            </div>
            <div class="q-pa-md q-gutter-sm" >
            <q-editor
              v-model="editor"
              style="width:380px; height:220px"
              :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'save',
                  label: 'Save',
                  handler: saveWork
                }
              }"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline'],
                ['save']
              ]"
            />
          </div>
          <div class="q-gutter-md">
            <!-- <q-btn no-caps push color="primary" icon="mail" text-color="white" :label="$t('detect_btn_email')" @click="sendEmail(true)" /> -->
            <q-btn no-caps push color="primary" icon="mail" :label="$t('detect_btn_email')" type="a" href="mailto:doctor-helper@gmail.com"></q-btn>
            <q-btn no-caps push color="primary" icon="restart_alt" text-color="white" :label="$t('detect_btn_reset')" @click="DBs.resetDectection('brain', imageId)" />
          </div>
          </div>
          <div
            v-else-if="image.detect"
            class="row justify-center"
          >
            <div class="text-h6 q-mb-md">{{ $t("detect_diagnosis") }}: {{ $t(image.result) }} <br/>
            {{ $t("detect_age") }}: {{ image.age }} <br/>{{ $t("detect_date_ct") }}: {{ image.date }}</div>
            <div 
            class="q-mb-md">
            <q-img
              v-if="image.detected_image"
              :src="image.detected_image"
              no-transition
              no-spinner
              style="width:380px"
              @click="imagePopup(image.detected_image)"
            >
            </q-img>
            </div>
            <div class="q-pa-md q-gutter-sm" >
            <q-editor
              v-model="editor"
              style="width:380px; height:220px"
              :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'save',
                  label: 'Save',
                  handler: saveWork
                }
              }"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline'],
                ['save']
              ]"
            />
          </div>
          <div class="q-gutter-md">
            <!-- <q-btn no-caps push color="primary" icon="mail" text-color="white" :label="$t('detect_btn_email')" @click="sendEmail(true)" /> -->
            <q-btn no-caps push color="primary" icon="mail" :label="$t('detect_btn_email')" type="a" href="mailto:doctor-helper@gmail.com"></q-btn>
            <q-btn no-caps push color="primary" icon="restart_alt" text-color="white" :label="$t('detect_btn_reset')" @click="DBs.resetDectection('brain', imageId)" />

          </div>
          </div>
          
        </div>
        
        
      </transition>
    </page-body>
  </page>
  <!-- 변수(T/F)를 던지면 True일때만 작동 -->
  <q-dialog 
        v-model="imageDialog"
        full-width
    >
        <q-card>            
            <img :src="imageUrl"  />
        </q-card>
    </q-dialog>
</template>

<script>
import { onActivated, onDeactivated, ref, reactive} from 'vue'
import { useRoute } from 'vue-router'
import storeBrain from 'src/doctorStore/brain.js'
import { axios, api_brain } from 'boot/axios'
import { useQuasar } from 'quasar'
import PageHeaderBtnBookmark from 'src/components/Page/PageHeaderBtnBookmark.vue'
import DBs from 'src/doctorStore/MongoDB.js'

export default {
  components: { PageHeaderBtnBookmark },
  name: 'Brain',
  setup() {
    // 이미지를 읽어 들여 버퍼에서 변환 처리
    var Buffer = require('buffer/').Buffer

    const $q = useQuasar() 
    const data = ref(null)
    // 이미지를 담기 위한 변수 선언
    const file = ref(null)
    let image = ref(null)
    let idx = ref()
    let detect = ref(false)
    let text = ref ('메모를 입력하세요')
    let bookmarks = ref(false)
    let imageId = ref()
    let route = useRoute()
    // 브라우저에서는 fs 모듈을 사용 불가
    // axios로 이미지 읽어 들인 후 base 64로 변환 처리
    async function getBase64(url) {
      return axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    }

    // 이미지 담기
    // file.value = getBase64('/images/xrays/2.png')
    
    // 해당 페이지를 오픈 할 경우 활성화
    onActivated(() => {
      getValues()
    })
    // 해당 페이지를 닫을 경우 이미지 변수 null 처리
    onDeactivated(() => {
      bookmarks.value = null
      image.value = null
      data.value = null
      imageId.value = null
      detect.value = false
      text.value = '메모를 입력하세요'
    })

    // 내가 추가한 부분
    async function getValues() {
     image.value = await DBs.getImage('brain', route.params.id)
     if ( typeof(image.value) != "undefined") {
     imageId.value = image.value["_id"]
     bookmarks.value = image.value["bookmark"]
     detect.value = image.value["detect"]
     text.value = image.value["memo"]
     console.log('hi', image.value, imageId.value, bookmarks.value, detect.value, text.value)}
    }
    
    async function bookmark(){
        bookmarks.value = !bookmarks.value
        await DBs.saveBookmark('brain', imageId.value, bookmarks.value)
    }
    
    async function saveWork () {
        $q.notify({
          message: '메모를 저장했습니다.',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
        await DBs.saveMemo('brain', imageId.value, text)
      }
    
    function sendEmail (grid) {
      $q.bottomSheet({
        message: 'Bottom Sheet message',
        grid,
        actions:
        [          
          {
            label: "Mail",
            img: '/images/contact/4.png',
            id: 'calendar'
          },
          {
            label: "MicrosoftOutlook",
            img: "/images/contact/1.png",
            id: 'ms',
          },
          {
            label: "Gmail",
            img: '/images/contact/2.png',
            id: 'keep'
          },
          // {
          //   label: "Dialer",
          //   img: '/images/contact/4.png',
          //   id: 'calendar'
          // }
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    // Dialog
    let imageDialog = ref(false)
    let imageUrl = ref(null)
    const imagePopup = (imgUrl) => {
            imageUrl.value = imgUrl
            imageDialog.value = true
            console.log(imgUrl)
        }

    function getFileName(fileUrl) {
      // URL을 가져와서 '/' 기준으로 배열 분리
      var filePathSplit = fileUrl.split('/');
      // 배열 분리 후 마지막 배열에서 다시 '.' 기준으로 분리
      var fileNameSplit = filePathSplit[filePathSplit.length -1].split('.')
      // 해당 파일의 첫번째 배열값 반환
      var fileName = fileNameSplit[0]

      return fileName
    }

    // 데이터 불러들여 처리
    async function loadData () {
      // 이미지 담기
      // const file = await getBase64('/images/xrays/1.jpg')
      // url로 접근해서 처리하는 방식이라 파일명을 함수로 못가져옴
      // 잘라서 가져오는 함수 구현
      const fileName = getFileName(image.value.url)
      const file = await getBase64(image.value.url)
      const base64 = 'data:image/jpg;base64,' + file;
      const blob = await fetch(base64).then(res => res.blob())

      // console.log('base64 ======> ', base64)
      // console.log('blob ======> ', blob)
      const formData = new FormData() 
      // form에 파일 정보 담기
      // 이미지 파일과 파일명
      formData.append('file', blob); 
      formData.append('fileName', fileName);

      //  로딩 표현
      $q.loading.show()

      // rest api로 예측 요청 넘기기
      api_brain.post('/predict', formData , { 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       })
        .then((response) => {
          // rest-api로 보낸 이미지 예측 결과값 받아오기
          console.log('response.data : ', response.data)
          data.value = response.data
          // 진단 결과 경로 저장하도록
          DBs.saveDectection('brain', imageId.value, data.value.diagnosis, data.value.img_url)
          $q.loading.hide()
        })
        .catch((e) => {
          // 처리 오류의 경우 화면에 notice
          $q.notify({
            color: 'negative',
            position: 'top',
            message: '진단이 실패하였습니다.',
            icon: 'report_problem'
          })
          $q.loading.hide()
        })
    }
    

    return {
      storeBrain,
      image,
      data,
      sendEmail,
      loadData,
      bookmark,
      bookmarks,
      editor: text,
      saveWork,
      imageDialog,
      imagePopup,
      imageUrl,
      DBs,
      imageId

    }
  }
}
</script>
<style lang="sass" scoped>
.btn-fixed-width
  width: 200px
</style>