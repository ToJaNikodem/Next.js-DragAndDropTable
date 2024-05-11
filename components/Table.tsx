'use client'

import LoadingPage from '@/app/dashboard/loading'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCorners,
} from '@dnd-kit/core'
import { Suspense, useState } from 'react'
import { Column, Field, UserTable } from '@/models/queries'
import TableColumn from './TableColumn'
import TableField from './TableField'
import { arrayMove } from '@dnd-kit/sortable'

export interface Items {
  columns: ItemsColumn[]
}

export interface ItemsColumn extends Column {
  id: string
  fields: ItemsField[]
}

export interface ItemsField extends Field {
  id: string
}

function Table({ userTable }: { userTable: UserTable }): JSX.Element {
  const [tableData] = useState<UserTable>(userTable)

  const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(
    null
  )

  const getItems = (): Items => {
    let lastId = 0
    const itemsColumns = userTable.columns.map((column): ItemsColumn => {
      const fields = column.fields.map((field): ItemsField => {
        lastId++
        const id = 'f' + lastId.toString()
        return { id, ...field }
      })
      lastId++
      const id = 'c' + lastId.toString()
      return { id, ...column, fields }
    })
    return { columns: itemsColumns }
  }

  const [items, setItems] = useState<Items>(getItems)

  const getColumnId = (fieldId: string): string => {
    let columnId = ''

    for (const column of items.columns) {
      for (const field of column.fields) {
        if (field.id === fieldId.toString()) {
          columnId = column.id
          break
        }
      }
    }

    return columnId
  }

  const getFieldById = (
    fieldId: string,
    columnId: string
  ): ItemsField | undefined => {
    const column = items.columns.find((col) => col.id === columnId)
    return column?.fields.find((field) => field.id === fieldId)
  }

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event
    setActiveDragId(active.id)
  }

  const handleDragOver = (event: DragOverEvent): void => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    if (
      Array.from(active.id.toString())[0] === 'f' &&
      Array.from(over.id.toString())[0] === 'f'
    ) {
      const activeItemColumnId = getColumnId(active.id.toString())
      const overItemColumnId = getColumnId(over.id.toString())

      if (activeItemColumnId !== overItemColumnId) {
        const newColumns = items.columns.map((column) => {
          if (
            column.id !== activeItemColumnId &&
            column.id !== overItemColumnId
          ) {
            return column
          }

          let newFields = column.fields

          const newField = getFieldById(
            active.id.toString(),
            activeItemColumnId
          )

          if (!newField) return column

          if (column.id === activeItemColumnId) {
            newFields = newFields.filter((field) => field.id !== active.id)
          }

          if (column.id === overItemColumnId) {
            newFields = [...newFields, newField]
          }

          return {
            ...column,
            fields: newFields,
          }
        })

        setTimeout(() => {
          setItems({ columns: newColumns })
        }, 0)
      }
    }
    if (
      Array.from(active.id.toString())[0] === 'f' &&
      Array.from(over.id.toString())[0] === 'c'
    ) {
      const activeItemColumnId = getColumnId(active.id.toString())
      const overColumnId = over.id

      const newColumns = items.columns.map((column) => {
        if (column.id !== activeItemColumnId && column.id !== overColumnId) {
          return column
        }

        let newFields = column.fields

        const newField = getFieldById(active.id.toString(), activeItemColumnId)

        if (!newField) return column

        if (column.id === activeItemColumnId) {
          newFields = newFields.filter((field) => field.id !== active.id)
        }

        if (column.id === overColumnId) {
          newFields = [...newFields, newField]
        }

        return {
          ...column,
          fields: newFields,
        }
      })

      setTimeout(() => {
        setItems({ columns: newColumns })
      }, 0)
    }
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    setActiveDragId(null)

    const { active, over } = event
    if (!over || active.id === over.id) return

    if (
      Array.from(active.id.toString())[0] === 'f' &&
      Array.from(over.id.toString())[0] === 'f'
    ) {
      const activeItemColumnId = getColumnId(active.id.toString())
      const overItemColumnId = getColumnId(over.id.toString())

      const newColumns = items.columns.map((column) => {
        if (activeItemColumnId === overItemColumnId) {
          const activeIndex = column.fields.findIndex(
            (field) => field.id === active.id
          )
          const overIndex = column.fields.findIndex(
            (field) => field.id === over.id
          )
          console.log('old: ', column.fields)
          const newFields = arrayMove(column.fields, activeIndex, overIndex)

          if (!newFields[0]) return column
          return { ...column, fields: newFields }
        }
        return column
      })

      setTimeout(() => {
        setItems({ columns: newColumns })
      }, 0)
    }
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="m-auto mt-8 h-4/5 max-w-fit rounded-md  border-2 border-black">
          <div className="pl-4 pt-2 font-bold">
            <h2 className="text-xl">{tableData.tableName}</h2>
          </div>
          <div className="flex flex-row gap-2 p-2">
            {items.columns.map((column) => (
              <TableColumn key={column.id} column={column} items={items} />
            ))}
          </div>
        </div>
        {activeDragId ? (
          <DragOverlay>
            <TableField
              field={getFieldById(
                activeDragId.toString(),
                getColumnId(activeDragId.toString())
              )}
              fieldId={activeDragId}
            />
          </DragOverlay>
        ) : null}
      </DndContext>
    </Suspense>
  )
}

export default Table
