import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const language = ref('ko')

const i18n = createI18n({
  locale: language.value,
  messages
})



export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
}

export { i18n }

export function useI18n() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t, te, tm, rt, d, n } = i18n.global;

  return {
    t: t.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    d: d.bind(i18n),
    n: n.bind(i18n),
  };
}