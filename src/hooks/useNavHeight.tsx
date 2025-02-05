import { useEffect, useState, useRef } from 'react'

const useNavHeight = () => {
  const navRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight)
    }
  }, [])

  return { navHeight, navRef }
}

export default useNavHeight
