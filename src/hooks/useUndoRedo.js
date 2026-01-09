import { useState, useCallback } from 'react'

export function useUndoRedo(initialValue) {
  const [history, setHistory] = useState([initialValue])
  const [historyStep, setHistoryStep] = useState(0)

  const current = history[historyStep]

  const push = useCallback((newValue) => {
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(newValue)
    setHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }, [history, historyStep])

  const undo = useCallback(() => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1)
    }
  }, [historyStep])

  const redo = useCallback(() => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1)
    }
  }, [historyStep, history.length])

  const canUndo = historyStep > 0
  const canRedo = historyStep < history.length - 1

  return {
    current,
    push,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
