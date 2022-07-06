import x from '../index'
import Search from '../Search.vue'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

describe('try',()=>{
    test('1', () => {

        const content = x()

        console.log(content)

     })
     mount('2', () => {
        const el = document.createElement('div')
        const App = {
            // template: `<Search></Search>`,
            // data() {
            //   return {
            //     count: 0
            //   }
            // },
            // components:{
            //     Search
            // }
        }
        createApp(App).mount(el)
        expect(el.innerHTML).toBe(`0`)
     })
})