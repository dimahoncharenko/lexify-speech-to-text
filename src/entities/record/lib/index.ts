import { Record } from '../model/types'

interface TransformedRecord {
  label: string
  items: Record[]
}

export function groupRecordsByDate(inputArray: Record[]): TransformedRecord[] {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  const result: TransformedRecord[] = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Previous 7 days', items: [] },
    { label: 'Previous 30 days', items: [] },
    { label: 'Long ago', items: [] },
  ]

  inputArray.forEach(item => {
    const itemDate = new Date(item.createdAt)

    if (itemDate.toDateString() === today.toDateString()) {
      result[0].items.push(item)
    } else if (itemDate.toDateString() === yesterday.toDateString()) {
      result[1].items.push(item)
    } else if (itemDate >= sevenDaysAgo && itemDate < yesterday) {
      result[2].items.push(item)
    } else if (itemDate >= thirtyDaysAgo && itemDate < sevenDaysAgo) {
      result[3].items.push(item)
    } else {
      result[4].items.push(item)
    }
  })

  return result
}
