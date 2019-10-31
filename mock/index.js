import Mock from 'mockjs'

import user from './user'

// const mocks = [
//   ...user
// ]

// Mock.mock('user/login',{
//   code:20000,
//   data: {
//     username: '李明',
//     password: '123456'
//   }
// })
Mock.mock('development/user/login', 'post', () => {
  return user.page1
})