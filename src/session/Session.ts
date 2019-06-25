import {User} from "../type/User";

class Session {
  setUser = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  get user(): User | null {
    const user = !!sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) as User : null;
    return user
  }

  removeUser = () => {
    sessionStorage.removeItem("user");
  }
}

export default new Session();