export interface UserModule {
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface UserRegisterRequestModule {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginRequestModule {
  email: string;
  password: string;
}

export interface UserLoginResponseModule {
  token: string;
  user: UserModule;
}
