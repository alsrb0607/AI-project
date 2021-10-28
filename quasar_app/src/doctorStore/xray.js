import { reactive } from 'vue'

const state = reactive({
  images: [
    {
      id: 'id1',
      url: '/images/xrays/1.jpg',
      caption: '환자번호 0001',
      age: '29',
      date: '2021-05-28',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id2',
      url: '/images/xrays/2.png',
      caption: '환자번호 0002',
      age: '39',
      date: '2021-06-29',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id3',
      url: '/images/xrays/3.png',
      caption: '환자번호 0003',
      age: '44',
      date: '2020-11-20',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id4',
      url: '/images/xrays/4.png',
      caption: '환자번호 0004',
      age: '54',
      date: '2020-12-24',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id5',
      url: '/images/xrays/5.png',
      caption: '환자번호 0005',
      age: '63',
      date: '2021-03-05',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id6',
      url: '/images/xrays/6.png',
      caption: '환자번호 0006',
      age: '22',
      date: '2021-04-23',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id7',
      url: '/images/xrays/7.png',
      caption: '환자번호 0007',
      age: '19',
      date: '2021-03-03',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id8',
      url: '/images/xrays/8.png',
      caption: '환자번호 0008',
      age: '18',
      date: '2021-01-01',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id9',
      url: '/images/xrays/9.png',
      caption: '환자번호 0009',
      age: '27',
      date: '2021-02-27',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    },
    {
      id: 'id10',
      url: '/images/xrays/10.png',
      caption: '환자번호 0010',
      age: '35',
      date: '2021-05-22',
      detect: false,
      bookmark: false,
      memo: '',
      data: ref(null),
      detected_image: '',
    }
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

const storeChest = {
  state,
  getters
}

export default storeChest