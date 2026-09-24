import { useCallback, useState } from 'react'
import { factOfTheDay } from '../lib/funFact'

// Starts on the fact of the day and pages through the list, wrapping around.
export function useFunFact(facts: string[]) {
  const [offset, setOffset] = useState(0)
  const start = factOfTheDay(facts.length, new Date())
  const next = useCallback(() => setOffset((value) => value + 1), [])
  const index = facts.length === 0 ? 0 : (start + offset) % facts.length
  return { fact: facts[index] ?? '', next, hasMore: facts.length > 1 }
}
