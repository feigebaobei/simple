

// let {sum} = require('.')

import {sum} from './sum'

it('str', () => {
    expect(sum(1,2)).toBe(3)
})