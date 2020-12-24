import React from 'react'

// Thank you https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
