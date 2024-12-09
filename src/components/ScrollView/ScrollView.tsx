type ScrollViewProps<T> = {
  data: T[]
  renderItem: (item: T) => React.ReactNode
}

export default function ScrollView<T>({
  data,
  renderItem,
}: ScrollViewProps<T>) {
  return (
    <div className='flex gap-10 items-center w-[400px] h-[200px] overflow-x-scroll scroll-smooth'>
      {data.map((item, index) => (
        <div key={index} className='w-full'>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}
