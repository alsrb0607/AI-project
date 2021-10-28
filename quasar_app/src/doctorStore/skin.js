import { reactive } from 'vue'

const state = reactive({
  images: [
    {
      id: 'id1',
      url: '/images/skins/1.jpg',
      caption: '환자번호 0001',
      age: '28',
      date: '2021-05-11',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id2',
      url: '/images/skins/2.jpg',
      caption: '환자번호 0002',
      age: '37',
      date: '2021-03-10',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id3',
      url: '/images/skins/3.jpg',
      caption: '환자번호 0003',
      age: '27',
      date: '2021-05-10',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id4',
      url: '/images/skins/4.jpg',
      caption: '환자번호 0004',
      age: '47',
      date: '2021-03-12',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id5',
      url: '/images/skins/5.jpg',
      caption: '환자번호 0005',
      age: '44',
      date: '2021-04-14',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id6',
      url: '/images/skins/6.jpg',
      caption: '환자번호 0006',
      age: '52',
      date: '2021-09-20',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id7',
      url: '/images/skins/7.jpg',
      caption: '환자번호 0007',
      age: '48',
      date: '2021-07-17',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id8',
      url: '/images/skins/8.jpg',
      caption: '환자번호 0008',
      age: '52',
      date: '2021-01-29',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id9',
      url: '/images/skins/9.jpg',
      caption: '환자번호 0009',
      age: '32',
      date: '2021-03-12',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id10',
      url: '/images/skins/10.jpg',
      caption: '환자번호 0010',
      age: '39',
      date: '2021-08-18',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id11',
      url: '/images/skins/11.jpg',
      caption: '환자번호 0011',
      age: '49',
      date: '2021-04-19',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
    {
      id: 'id12',
      url: '/images/skins/12.jpg',
      caption: '환자번호 0012',
      age: '41',
      date: '2021-11-19',
      bookmark: false,
      memo: '',
      detect: false,
      data: ref(null),
    },
  ],
  usePageTransition: false,
  iosBrowserSwipingBack: false
})

import { ref } from 'vue'

const getters = {
  getImage(imageId) {
    return state.images.filter(image => image.id === imageId)[0]
  },

  getIndex(imageId) {
    // return state.images.map(function(d) { return d['id']}).indexOf(imageId)
    return state.images.map(image => { return image['id']}).indexOf(imageId)
  }
}

const storeSkin = {
  state,
  getters
}

export default storeSkin