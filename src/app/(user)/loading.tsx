export default function Loading() {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='animate-spin rounded-full h-20 w-20 border-4 border-t-transparent border-[var(--foreground)]' />
      <p className='mt-4 text-lg font-medium text-[var(--muted-foreground)]'>
        Loading...
      </p>
    </div>
  )
}
