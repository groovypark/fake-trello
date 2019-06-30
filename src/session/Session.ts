import {UserType} from "../type/UserType";

class Session {
  setUser = (user: UserType) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  get user(): UserType | null {
    const user = !!sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) as UserType : null;
    return user
  }

  removeUser = () => {
    sessionStorage.removeItem("user");
  }
}

export default new Session();