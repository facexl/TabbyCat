
function generate (obj:typeof localStorage | typeof sessionStorage) {
  return {
    set (key:string, value:string|unknown) {
      if (Object.prototype.toString.call(value) === '[object String]') obj.setItem(key, value as string)
      if (typeof value === 'object') obj.setItem(key, JSON.stringify(value))
    },
    get (key:string) {
      let value = obj.getItem(key)
      try {
        value = JSON.parse(value as any)
      } catch (e) {
        // console.log('storage json解析错误')
      }
      return value
    },
    remove (key:string) {
      obj.removeItem(key)
    },
    clear () {
      obj.clear()
    }
  }
}

export const local = generate(window.localStorage)
export const session = generate(window.sessionStorage)
