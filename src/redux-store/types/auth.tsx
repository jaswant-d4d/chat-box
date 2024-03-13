export interface authState {

}

export interface LoginResType {
  success: boolean;
  token: string;
  message: string;
}

export interface userDetailsType {
    name: string,
    email: string,
    username: string,
    dob: string,
    createdAt: string,
}

export interface userResType {
  user: userDetailsType;
}