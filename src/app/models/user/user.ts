export class User {
  constructor(private userName: string | null = '', private authenticationLevel: number | null = 1, private email: string | null = '') {
  }

  getUserName(): string | null {
    return this.userName;
  }

  setUserName(value: string | null) {
    this.userName = value;
  }

  getAuthenticationLevel(): number | null {
    return this.authenticationLevel;
  }

  setAuthenticationLevel(value: number | null) {
    this.authenticationLevel = value;
  }

  getEmail(): string | null {
    return this.email;
  }

  setEmail(value: string | null) {
    this.email = value;
  }
}
