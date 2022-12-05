let cb2P = (fn, ...params) =>
  new Promise((s, j) => {
    fn(...params, (err, res) => {
      return err ? j(err) : s(res)
    })
  })
// let callbackToPromise = cbToP

let isPromise = (obj) => {
    return 'function' == typeof obj.then;
  }
let isUndefined = c => (a === undefined)
export {
    // cb2P
    isPromise,
    isUndefined,
}