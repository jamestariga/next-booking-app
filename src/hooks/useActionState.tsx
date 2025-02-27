import {
  useCallback,
  useState,
  useEffect,
  useRef,
  useActionState as useReactActionState,
} from 'react'

export function useActionState<State, Payload>(
  ...args: Parameters<typeof useReactActionState<State, Payload>>
): [
  ...ReturnType<typeof useReactActionState<State, Payload>>,
  resetActionState: () => void
] {
  const [state, dispatch, isPending] = useReactActionState(...args)
  const [currentState, setCurrentState] = useState(state)

  const currentStateRef = useRef(currentState)
  currentStateRef.current = currentState

  useEffect(() => {
    if (currentStateRef.current !== state) {
      currentStateRef.current = state
      setCurrentState(state)
    }
  }, [state])

  const [, initialState] = args
  const reset = useCallback(() => {
    currentStateRef.current = initialState
    setCurrentState(initialState)
  }, [initialState])

  return [currentState, dispatch, isPending, reset]
}
