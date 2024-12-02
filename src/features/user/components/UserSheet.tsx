'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DisplayNameFields, SheetProps } from '../types/form.types'

const UserSheet = ({
  label,
  fieldName,
  defaultValue,
  subFields,
  register,
  setValue,
  getValues,
  error,
  isEditing,
  onToggleEdit,
  onSave,
  setEditMode,
}: SheetProps) => {
  const hasSubFields = Boolean(subFields?.length)

  const handleSave = async () => {
    if (hasSubFields && subFields) {
      const values = subFields.reduce(
        (acc, { fieldName }) => ({
          ...acc,
          [fieldName]: getValues(`display_name.${fieldName}`),
        }),
        {}
      )
      await onSave(fieldName, values as DisplayNameFields)
    } else {
      const value = getValues(fieldName)
      await onSave(fieldName, value as string)
    }
    setEditMode((prev) => ({ ...prev, [fieldName]: false }))
  }

  const openSheet = () => {
    setEditMode((prev) => ({ ...prev, [fieldName]: isEditing ? false : true }))

    if (fieldName === 'display_name') {
      const firstName = subFields.find(
        ({ fieldName }) => fieldName === 'first_name'
      )?.defaultValue
      const lastName = subFields.find(
        ({ fieldName }) => fieldName === 'last_name'
      )?.defaultValue

      setValue('display_name.first_name', firstName!)
      setValue('display_name.last_name', lastName!)
    } else {
      setValue(fieldName, defaultValue)
    }
  }

  return (
    <div className='flex flex-col border-b p-2'>
      <div className='flex flex-col text-sm'>
        <div className=''>
          <Label>{label}</Label>
        </div>
        <div className='flex justify-between'>
          <span>{defaultValue || 'Not Provided'}</span>
          <Sheet open={isEditing} onOpenChange={openSheet}>
            <SheetTrigger asChild>
              <Button
                variant='outlinedNone'
                size='sm'
                onClick={() => onToggleEdit(fieldName)}
              >
                Edit
              </Button>
            </SheetTrigger>
            <SheetContent
              onInteractOutside={(e) => {
                e.preventDefault()
              }}
            >
              <SheetHeader>
                <SheetTitle>Edit {label}</SheetTitle>
                <SheetDescription>
                  Make changes to your {label.toLowerCase()} here. Click save
                  when you&apos;re done.
                </SheetDescription>
              </SheetHeader>

              <div className='grid gap-4 py-4'>
                {hasSubFields ? (
                  subFields?.map(({ fieldName, label, defaultValue }) => (
                    <div key={fieldName} className='grid gap-2'>
                      <Label htmlFor={fieldName}>{label}</Label>
                      <Input
                        type='text'
                        id={fieldName}
                        {...register(`display_name.${fieldName}`, {
                          required: `${label} is required`,
                          onChange: () =>
                            setValue(
                              `display_name.${fieldName}`,
                              getValues(`display_name.${fieldName}`)
                            ),
                        })}
                        defaultValue={defaultValue}
                      />
                    </div>
                  ))
                ) : (
                  <div className='grid gap-2'>
                    <Label htmlFor={fieldName}>{label}</Label>
                    <Input
                      type='text'
                      id={fieldName}
                      {...register(fieldName, {
                        required: `${label} is required`,
                        onChange: () =>
                          setValue(fieldName, getValues(fieldName)),
                      })}
                      defaultValue={defaultValue}
                    />
                  </div>
                )}
              </div>

              {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => onToggleEdit(fieldName)}
                  >
                    Cancel
                  </Button>
                </SheetClose>
                <Button type='button' onClick={handleSave}>
                  Save changes
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default UserSheet
