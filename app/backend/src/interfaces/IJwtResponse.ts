export default interface IJwtResponse {
  data: {
    id: number,
    username: string,
    email: string,
    role: string,
  }
}
