'use client'

import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Items, ItemsColumn, ItemsField } from './Table'
import { useCallback, useEffect, useState } from 'react'
import TableField from './TableField'
import { useDroppable } from '@dnd-kit/core'

function TableColumn({
  column,
  items,
}: {
  column: ItemsColumn
  items: Items
}): JSX.Element {
  const columnId = column.id

  const getColumnItems = useCallback((): ItemsField[] | null => {
    const column = items.columns.find((column) => column.id === columnId)
    if (!column) return null

    const columnItems = column.fields.map((field) => {
      return field
    })

    return columnItems
  }, [columnId, items.columns])

  const [columnItems, setColumnItems] = useState(getColumnItems)

  const { setNodeRef } = useDroppable({ id: columnId })

  useEffect(() => {
    setColumnItems(getColumnItems)
  }, [getColumnItems])

  if (columnItems !== null) {
    return (
      <div className="flex w-48 flex-col rounded-md border-2 border-stone-600 p-2">
        <p className="text-lg">{column.columnName}</p>
        <div ref={setNodeRef}>
          <SortableContext items={columnItems} strategy={rectSortingStrategy}>
            {column.fields.map((field) => (
              <TableField key={field.id} field={field} fieldId={field.id} />
            ))}
          </SortableContext>
        </div>
      </div>
    )
  } else {
    return <div>Error</div>
  }
}

export default TableColumn
