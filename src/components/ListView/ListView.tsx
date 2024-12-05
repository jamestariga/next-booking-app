type ListViewProps<T> = {
  data: T[]
  renderItem: (item: T) => React.ReactNode
  renderSkeleton?: () => React.ReactNode
  isLoading?: boolean
}

export default function ListView<T>({
  data,
  renderItem,
  renderSkeleton,
  isLoading = false,
}: ListViewProps<T>) {
  const getGridTemplateColumns = (dataLength: number) => {
    if (dataLength === 1) return 'grid-cols-1 place-items-center'
    if (dataLength === 2) return 'sm:grid-cols-2'
    if (dataLength === 3) return 'sm:grid-cols-2 md:grid-cols-3'
    if (dataLength === 4) return 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    return 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
  }

  if (isLoading && renderSkeleton) {
    return (
      <div
        className={`grid ${getGridTemplateColumns(
          5
        )} place-items-center gap-4 w-full`}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className='w-full place-items-center'>
            {renderSkeleton()}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`grid ${getGridTemplateColumns(
        data.length
      )} place-items-center gap-4 w-full`}
    >
      {data.map((item, index) => (
        <div key={index} className='w-full place-items-center'>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}
