<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div style="cursor:pointer" @click="a++">{{a}}</div>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { ref, onMounted, watch } from 'vue'

export default {
  components: {
    HelloWorld
  },
  props: {
    fuck: {
      default: 1
    }
  },
  setup (props:any, context:any) {
    console.log(props, context.slots, 123245)
    const a = ref(0)
    onMounted(() => {
      a.value = 100
    })
    // watch(a, (c, p) => {
    //   setTimeout(() => {
    //     a.value++
    //   }, 1000)
    // })
    return {
      a
    }
  },
  watch: {
    a (c:any) {
      console.log('a', c)
    }
  },
  created () {
    console.log('creared')
  },
  methods: {

  }
}
</script>
