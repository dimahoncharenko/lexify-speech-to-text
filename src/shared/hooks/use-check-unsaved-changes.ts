import { useContext } from 'react'

import { UnsavedChangesContext } from '../lib/unsaved-changes-context'

export const useCheckUnsavedChanges = () => {
  const { unsavedChanges, update } = useContext(UnsavedChangesContext)

  const changeState = (value: boolean) => {
    update(prev => ({
      ...prev,
      unsavedChanges: value,
    }))
  }

  return [unsavedChanges, changeState] as const
}
