import { Schedule as ScheduleType } from '@/server-functions/schedule'
import ScheduleList from './components/ScheduleList'

type ScheduleProps = {
  schedules: ScheduleType[]
  barberId: number
}

const Schedule = ({ schedules, barberId }: ScheduleProps) => {
  return (
    <div className='max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
      <ScheduleList schedules={schedules} barberId={barberId} />
    </div>
  )
}

export default Schedule
