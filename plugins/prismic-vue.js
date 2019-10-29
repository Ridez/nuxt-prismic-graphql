import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import htmlSerializer from './html-serializer'

Vue.use(PrismicVue, {
  htmlSerializer
})