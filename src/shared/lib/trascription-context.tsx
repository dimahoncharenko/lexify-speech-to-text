'use client'

import { createContext, useEffect, useOptimistic, useState } from 'react'
import { Record } from '@/entities/record/model/types'

import { fetchRecords } from './requests'

type Context = {
  selected: Record | null
  setSelected: (record: Record | null) => void
  addRecord: (record: Record) => void
  records: Record[]
  optimisticRecords: Record[]
  setOptimisticRecord: (action: Record) => void
  currentTranscription: null | string
  setCurrentTranscription: (value: string | null) => void
}

export const SidebarContext = createContext({} as Context)

type SidebarProviderProps = {
  children: React.ReactNode
}

export const SelectedProvider = ({ children }: SidebarProviderProps) => {
  const [currentTranscription, setCurrentTranscription] = useState<
    null | string
  >(null)
  const [selected, setSelected] = useState<Record | null>(null)
  const [records, setRecords] = useState<Record[]>([])
  const [optimisticRecords, setOptimisticRecord] = useOptimistic<
    Record[],
    Record
  >(records, (state, record) => [...state, record])

  const addRecord = (record: Record) => {
    setRecords(prev => [...prev, record])
  }

  useEffect(() => {
    ;(async () => {
      try {
        const records = await fetchRecords()
        setRecords(records)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        selected,
        setSelected: setSelected,
        records,
        optimisticRecords,
        setOptimisticRecord,
        addRecord,
        currentTranscription,
        setCurrentTranscription,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
