import Vue from 'vue'
import VueClickoutside from './../build/index.js'

describe('check methods', () => {
  it('as a plugin', next => {
    expect(VueClickoutside.install).toBeDefined()
    next()
  })

  it('as a directive', next => {
    expect(VueClickoutside.bind).toBeDefined()
    expect(VueClickoutside.unbind).toBeDefined()
    next()
  })
})

describe('directive is work', () => {
  let vm

  afterEach(next => {
    vm.$destroy()
    next()
  })

  it('as a plugin', next => {
    vm = new Vue({
      el: 'body',
      replace: false,
      template: `<span class="outside">outside</span>
                 <button class="button" v-clickoutside="handleClick()">click me.</button>`,
      directives: {
        'clickoutside': VueClickoutside
      },
      methods: {
        handleClick() {
          console.log('23333')
        }
      }
    })

    spyOn(vm, 'handleClick')
    document.querySelector('.outside').click()
    document.querySelector('.button').click()
    expect(vm.handleClick.calls.count()).toEqual(1)
    next()
  })

  it('as a directive', next => {
    Vue.use(VueClickoutside)

    vm = new Vue({
      el: 'body',
      replace: false,
      template: `<span class="outside">outside</span>
                 <button class="button" v-clickoutside="handleClick()">click me.</button>`,
      methods: {
        handleClick() {
          console.log('23333')
        }
      }
    })

    spyOn(vm, 'handleClick')
    document.querySelector('.outside').click()
    document.querySelector('.button').click()
    expect(vm.handleClick.calls.count()).toEqual(1)
    next()
  })

  it('namespaces', next => {
    Vue.use(VueClickoutside)

    vm = new Vue({
      el: 'body',
      replace: false,
      template: `<span class="outside1">outside1</span>
                 <button class="button1" v-clickoutside="handleClick1()">click me.</button>
                 <span class="outside2">outside2</span>
                 <button class="button2" v-clickoutside="handleClick2()">click me.</button>
                 <span class="outside3">outside3</span>
                 <button class="button3" v-clickoutside="handleClick3()">click me.</button>`,
      methods: {
        handleClick1() {
          console.log('23333')
        },
        handleClick2() {
          console.log('6666')
        },
        handleClick3() {
          console.log('99999')
        }
      }
    })
    spyOn(vm, 'handleClick1')
    spyOn(vm, 'handleClick2')
    spyOn(vm, 'handleClick3')

    document.querySelector('.outside1').click()
    document.querySelector('.button1').click()
    document.querySelector('.outside3').click()
    document.querySelector('.outside1').click()
    document.querySelector('.button2').click()

    expect(vm.handleClick1.calls.count()).toEqual(4)
    expect(vm.handleClick2.calls.count()).toEqual(4)
    expect(vm.handleClick3.calls.count()).toEqual(5)
    next()
  })
})
