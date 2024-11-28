'use client'
import { Button } from '../ui/button'

type ButtonIconProps = {
  icon: React.ReactNode
  onClick: () => void
}

const ButtonIcon = ({ icon, onClick }: ButtonIconProps) => {
  return (
    <Button variant={'ghost'} onClick={onClick}>
      {icon}
    </Button>
  )
}

export default ButtonIcon
