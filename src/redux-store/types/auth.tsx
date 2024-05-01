export interface authState {

}

export interface LoginResType {
  success: boolean;
  token: string;
  message: string;
}

export interface userDetailsType {
  _id: string,
  name: string,
  email: string,
  username: string,
  dob: string,
  createdAt: string,
}

export interface userResType {
  user: userDetailsType;
}

export interface selectedConversationType {
  name: string
  username: string
  _id: string
  isGroup: boolean
}