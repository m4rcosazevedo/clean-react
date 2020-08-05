export class UnexpectedError extends Error {
  constructor () {
    super('Aldo de errado aconteceu. Tente novamente em breve.')
    this.name = 'UnexpectedError'
  }
}
