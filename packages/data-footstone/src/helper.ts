import {
     F, N, S, A
  } from './typings'
  
  
let af = Array.from
let NPF = Number.POSITIVE_INFINITY
function mapToObj (strMap: Map<S, A>) {
    let obj = Object.create(null)
    for (let [key, value] of strMap) {
        obj[key] = value
    }
    return obj
}
export {af, NPF, mapToObj}