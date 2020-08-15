import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account-model'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  account = mockAccountModel()
  callsCount = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
