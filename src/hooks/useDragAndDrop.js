import { useState, useRef } from 'react'

export function useDragAndDrop(initialItems, onReorder) {
  const [items, setItems] = useState(initialItems)
  const [draggedItem, setDraggedItem] = useState(null)
  const dragOverItem = useRef(null)

  const handleDragStart = (index) => {
    setDraggedItem(index)
  }

  const handleDragEnter = (index) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (draggedItem === null || dragOverItem.current === null) {
      setDraggedItem(null)
      return
    }

    const newItems = [...items]
    const draggedItemContent = newItems[draggedItem]
    
    newItems.splice(draggedItem, 1)
    newItems.splice(dragOverItem.current, 0, draggedItemContent)
    
    setItems(newItems)
    setDraggedItem(null)
    dragOverItem.current = null
    
    if (onReorder) {
      onReorder(newItems)
    }
  }

  return {
    items,
    draggedItem,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    setItems
  }
}
