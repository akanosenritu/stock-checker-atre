export type Success = {
  status: "success"
}

export type SuccessWithData<T> = Success & {
  data: T
}

export type Failure = {
  status: "error",
  message?: string
}
