import { HttpPostParams } from '@/data/protocols/http'
import faker from 'faker'

export const mokePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
