export class InvalidCredencialsError extends Error {
  constructor () {
    super('Credenciais inválidas')
    this.name = 'InvalidCredencialsError'
  }
}
