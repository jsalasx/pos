export interface ApiResponseDto<T> {
  data: T
  error: boolean
  message: string
  status: number
}
