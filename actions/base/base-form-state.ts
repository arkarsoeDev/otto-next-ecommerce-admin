export interface BaseFormState {
  message: string
  errors?: {
    _form?: string[];
  },
  success?: boolean
}
