export const passwordValidations = {
  lowercase: {
    regex: /^(?=.*[a-z]).*$/,
    message: 'Must contain a lowercase letter',
  },
  uppercase: {
    regex: /^(?=.*[A-Z]).*$/,
    message: 'Must contain an uppercase letter',
  },
  number: {
    regex: /^(?=.*[0-9]).*$/,
    message: 'Must contain a number',
  },
  symbol: {
    regex: /^(?=.*[=+\-^$*.[\]{}()?"!@#%&/\\,><':;|_~`]).*$/,
    message: 'Must contain a symbol (e.g. @, ?, !, _, -, €)',
  },
}
