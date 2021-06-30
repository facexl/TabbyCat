## RoadMap  

- 前端技术选型  vue3 typeScript
- 后端技术选型  koa2  
- 同构  
- 同构解决白屏  代价：服务端资源浪费 开发束缚  
- 白屏其他解决方案  骨架屏等  


Vue 没有内置支持防抖和节流，但可以使用 Lodash 等库来实现。

如果某个组件仅使用一次，可以在 methods 中直接应用防抖：

```javascript
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // 用 Lodash 的防抖函数
      click: _.debounce(function() {
        // ... 响应点击 ...
      }, 500)
    }
  }).mount('#app')
</script>
```
但是，这种方法对于可复用组件有潜在的问题，因为它们都共享相同的防抖函数。为了使组件实例彼此独立，可以在生命周期钩子的 created 里添加该防抖函数:

```javascript
app.component('save-button', {
  created() {
    // 用 Lodash 的防抖函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 响应点击 ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```

## 时间差 debugger

https://blog.csdn.net/qq_31965515/article/details/89349388  


### vue3不同之处  

- 一个组件可以有多个根元素  

```javascript
<div id="app">
  <my-component class="baz"></my-component>
</div>

const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p> // $attr指定需要接受class的根元素  
    <span>This is a child component</span>
  `
})

```

v-model.number v-model.trim  可以自定义

## 插槽  

## AST is must learn if want to do Front-end engineering

## 看到高阶指南了  