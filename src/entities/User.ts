export type User = {
  id: string,
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  updateProfile: (firstName: string, lastName: string) => Promise<void>,
}
