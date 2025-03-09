'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UserSchema,
  type UserFormData,
  DisplayNameFields,
} from './schema/schema'
import UserSheet from './components/UserSheet'
import { updateUserDetails } from '@/server-functions/user'
import { FieldConfig, FieldName, UserInfoFields } from './types/form.types'

type UserFormProps = {
  display_name: string
  first_name: string
  last_name: string
  email: string
  id: number
  user_id: string
}

const UserForm = ({
  display_name,
  first_name,
  last_name,
  email,
  id,
  user_id,
}: UserFormProps) => {
  const [editMode, setEditMode] = useState<Record<FieldName, boolean>>({
    display_name: false,
    email: false,
  })
  const originalValues = {
    display_name: {
      first_name: first_name || '',
      last_name: last_name || '',
    },
    email: email || '',
  }

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: originalValues,
  })

  // TODO: Move the server action to a client side action
  const handleFieldSave = async (
    fieldName: UserInfoFields,
    value: string | DisplayNameFields
  ) => {
    try {
      if (fieldName === 'display_name') {
        const values = value as DisplayNameFields

        await updateUserDetails(
          {
            first_name: values.first_name,
            last_name: values.last_name,
          },
          id,
          user_id
        )
      } else {
        await updateUserDetails(
          {
            [fieldName]: value as string,
          },
          id,
          user_id
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleEditMode = (field: FieldName) => {
    setEditMode((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {} as Record<FieldName, boolean>
      )

      // If we're turning off edit mode for this field
      if (prev[field]) {
        // Reset just this specific field to its original value
        if (field === 'display_name') {
          setValue('display_name', originalValues.display_name)
        } else {
          setValue(field, originalValues[field])
        }
      }

      return { ...newState, [field]: !prev[field] }
    })
  }

  const fields: FieldConfig[] = [
    {
      label: 'Display Name',
      fieldName: 'display_name',
      defaultValue: display_name || 'Not Provided',
      subFields: [
        {
          fieldName: 'first_name',
          label: 'First Name',
          defaultValue: first_name || '',
        },
        {
          fieldName: 'last_name',
          label: 'Last Name',
          defaultValue: last_name || '',
        },
      ],
    },
    {
      label: 'Email',
      fieldName: 'email',
      defaultValue: email || '',
    },
  ]

  return (
    <form className='w-full space-y-4'>
      {fields.map(({ label, fieldName, defaultValue, subFields }) => (
        <UserSheet
          key={fieldName}
          label={label}
          fieldName={fieldName}
          fieldValue={
            fieldName === 'display_name'
              ? `${getValues('display_name.first_name')} ${getValues(
                  'display_name.last_name'
                )}`.trim()
              : getValues(fieldName)
          }
          defaultValue={defaultValue}
          subFields={subFields || []}
          register={register}
          setValue={setValue}
          getValues={getValues}
          error={
            fieldName === 'display_name'
              ? errors.first_name?.message || errors.last_name?.message
              : errors[fieldName]?.message
          }
          isEditing={editMode[fieldName]}
          onToggleEdit={() => toggleEditMode(fieldName)}
          onSave={handleFieldSave}
          setEditMode={setEditMode}
        />
      ))}
    </form>
  )
}

export default UserForm
