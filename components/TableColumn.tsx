import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Items, ItemsColumn, ItemsField } from './Table'
import { useState } from 'react'
import TableField from './TableField'

function TableColumn({
  column,
  items,
}: {
  column: ItemsColumn
  items: Items
}): JSX.Element {
  const columnId = column.id

  const getColumnItems = (): ItemsField[] | null => {
    const column = items.columns.find((column) => column.id === columnId)
    const columnItems = column?.fields.map((field) => {
      return field
    })
    if (columnItems) return columnItems
    return null
  }

  const [columnItems, setColumnItems] = useState(getColumnItems)

  console.log('column id: ', columnId, ' items: ', columnItems)

  if (columnItems !== null) {
    return (
      <SortableContext items={columnItems} strategy={rectSortingStrategy}>
        <div className="flex w-48 flex-col gap-2 rounded-md border-2 border-stone-600 p-2">
          <p className="text-lg">{column.columnName}</p>
          {column.fields.map((field) => (
            <TableField key={field.index} field={field} fieldId={field.id} />
          ))}
        </div>
      </SortableContext>
    )
  } else {
    return <div>Error</div>
  }
}

export default TableColumn
