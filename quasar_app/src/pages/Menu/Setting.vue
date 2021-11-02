<template>
  <page>
    <page-header>
     <template #buttons-left>
        <page-header-btn-back
          label=""
        />
      </template>
      <template #title>{{ $t('title_setting') }}</template>
      <template #buttons-menu>
      <page-header-btn-menu
      />
      </template>
      
    </page-header>
    <page-body>      
        <q-list bordered padding>
            <q-item-label header>{{ $t('setting_subtitle_user') }}</q-item-label>
          
            <q-item clickable v-ripple>
                <q-item-section>
                <q-item-label>{{ $t('setting_subtitle_language') }}</q-item-label>
                <q-item-label>
                    <q-select
                        v-model="locale"
                        :options="localeOptions"
                        dense
                        emit-value
                        map-options
                        options-dense
                        style="min-width: 150px"
                    />
                </q-item-label>
                </q-item-section>
            </q-item>

            <q-separator spaced />
            <q-item-label header>{{ $t('setting_subtitle_color') }}</q-item-label>

            <!-- <q-item tag="label" v-ripple>
                <q-item-section side top>
                    <q-checkbox v-model="darkMode" @click="checkDarkMode" />
                </q-item-section>

                <q-item-section>
                <q-item-label>다크모드</q-item-label>
                <q-item-label caption>
                    다크모드 설정 
                </q-item-label>
                </q-item-section>
            </q-item> -->

            <q-item tag="label">
                <q-item-section>
                    <div class="row justify-center">
                        <q-color 
                            v-model="colorPrimaryHex" 
                            no-header 
                            @click="setColor" 
                            style="width: 250px"
                        />
                    </div>
                </q-item-section>
            </q-item>
            <div class="q-gutter-md row justify-center">
            <q-btn color="primary" icon="settings_backup_restore" :label="$t('setting_btn_reset')" @click="reset" />
          </div>

            <q-separator spaced />
            <q-item-label header>{{ $t('setting_subtitle_others') }}</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                <q-item-label>{{ $t('setting_others_battery') }}</q-item-label>
                <q-item-label caption>{{ $t('setting_others_battery_detail') }}</q-item-label>
                </q-item-section>
                <q-item-section side >
                <q-toggle color="primary" v-model="powerSaving" val="battery" />
                </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
                <q-item-section>
                <q-item-label>{{ $t('setting_others_email') }}</q-item-label>
                <q-item-label caption>{{ $t('setting_others_email_detail') }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                <q-toggle color="primary" v-model="email" val="friend" />
                </q-item-section>
            </q-item>

        </q-list>
    </page-body>
  </page>
</template>
<script>
// quasar dev list&list items - settings
import { ref, onUpdated, onActivated, onDeactivated, watch  } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar, getCssVar, setCssVar  } from 'quasar'
export default {
    setup() {
        const $q = useQuasar()
        const { locale } = useI18n({ useScope: 'global' })
        const localeOptions = [
                { value: 'en-US', label: 'English' },
                { value: 'ko', label: '한국어' },
                { value: 'jp', label: '日本語' },
                { value: 'eo', label: 'Esperanto' }
            ]
        const darkMode = ref(false)
        const powerSaving = ref($q.localStorage.getItem("powerSaving"))
        const email = ref($q.localStorage.getItem("email"))

        const colorPrimaryHex = ref(getCssVar('primary'))
        darkMode.value = $q.localStorage.getItem(darkMode) ? true : false
    
        const checkDarkMode = (() => {
    
            $q.localStorage.set('darkMode', darkMode.value)
            $q.dark.set(darkMode.value)
        })
        const setColor = (() => {
            setCssVar('primary', colorPrimaryHex.value)
            $q.localStorage.set('primary', colorPrimaryHex.value)
            
        })
        const reset = (() => {
            setCssVar('primary', '#009688')
            $q.localStorage.set('primary', '#009688')
            colorPrimaryHex.value = '#009688'
            locale.value = 'ko'
            $q.localStorage.set('language', 'ko')
        })
  
        // watch(바라볼 변수, 변수가 변하면 실행할 함수)
        watch(locale,() => {
            $q.localStorage.set('language', locale.value)
        })
        
        watch(powerSaving,() => {
            $q.localStorage.set('powerSaving', powerSaving.value)
        })
        
        watch(email,() => {
            $q.localStorage.set('email', email.value)
        })
        return {
            darkMode,
            locale,
            localeOptions,
            powerSaving,
            email,
            checkDarkMode,
            colorPrimaryHex,
            setColor,
            reset
        }
    },
}
</script>