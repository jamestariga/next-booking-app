'use client'

import { UseFormReturn } from 'react-hook-form'
import { type ScheduleFormData } from '../schema/schema'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

import { DAYS_OF_WEEK, generateTimeOptions } from '../utils'

// Generate time options once
const timeOptions = generateTimeOptions()

type ScheduleFormFieldsProps = {
  form: UseFormReturn<ScheduleFormData>
  isPending: boolean
  isEditing: boolean
}

const ScheduleFormFields = ({
  form,
  isPending,
  isEditing,
}: ScheduleFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name='day'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Day of Week</FormLabel>
            <Select
              disabled={isPending}
              onValueChange={(value) => field.onChange(parseInt(value))}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select a day' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name='start_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select start time' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='end_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select end time' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='is_active'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel className='text-base'>Active</FormLabel>
              <div className='text-sm text-muted-foreground'>
                Set whether this schedule is currently active
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isPending}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending
          ? 'Saving...'
          : isEditing
          ? 'Update Schedule'
          : 'Create Schedule'}
      </Button>
    </>
  )
}

export default ScheduleFormFields
