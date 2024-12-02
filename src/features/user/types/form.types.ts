import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form'
import type { UserFormData } from '../schema/schema'
import { SetStateAction } from 'react'

// TODO: add more values to SingleFieldName as needed later
export type SingleFieldName = 'email'
export type DisplayNameFields = 'first_name' | 'last_name'
export type FieldName = SingleFieldName | 'display_name'

export type UserInfoFields =
  | 'email'
  | 'display_name'
  | 'first_name'
  | 'last_name'
export type SubFields = {
  fieldName: DisplayNameFields
  label: string
  defaultValue: string
}

export type DefaultValue = string | { first_name: string; last_name: string }

export type FieldConfig = {
  label: string
  fieldName: FieldName
  defaultValue: string
  subFields?: SubFields[]
}

export type SheetProps = {
  label: string
  fieldName: keyof UserFormData
  fieldValue?: string
  defaultValue: string
  subFields: SubFields[]
  hasSubFields?: boolean
  register: UseFormRegister<UserFormData>
  setValue: UseFormSetValue<UserFormData>
  getValues: UseFormGetValues<UserFormData>
  error?: string
  isEditing: boolean
  onToggleEdit: (param?: string) => void
  onSave: (fieldName: UserInfoFields, value: DefaultValue) => Promise<void>
  setEditMode: (value: SetStateAction<Record<FieldName, boolean>>) => void
}
