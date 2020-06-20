const USER_TOKEN = "user_token";

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN)
}
export function setUserToken(token) {
  localStorage.setItem(USER_TOKEN, token)
}
export function removeUserToken() {
  localStorage.removeItem(USER_TOKEN)
}