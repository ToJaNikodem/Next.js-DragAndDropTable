'use client'

import LoadingPage from '@/app/dashboard/loading'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  closestCorners,
} from '@dnd-kit/core'
import { Suspense, useState } from 'react'
import { Column, Field, UserTable } from '@/models/queries'
import TableColumn from './TableColumn'

export interface Items {
  columns: ItemsColumn[]
}

export interface ItemsColumn extends Column {
  id: UniqueIdentifier
  fields: ItemsField[]
}

export interface ItemsField extends Field {
  id: UniqueIdentifier
}

function Table({ userTable }: { userTable: UserTable }): JSX.Element {
  const [tableData] = useState<UserTable>(userTable)

  const getItems = (): Items => {
    let lastId = 0
    const itemsColumns = userTable.columns.map((column): ItemsColumn => {
      const fields = column.fields.map((field): ItemsField => {
        lastId++
        const id = lastId
        return { id, ...field }
      })
      lastId++
      const id = lastId
      return { id, ...column, fields }
    })
    return { columns: itemsColumns }
  }

  const [items] = useState<Items>(getItems)

  const handleDragStart = (event: DragStartEvent): void => {
    const { active, over } = event
    console.log('id: ', active.id)
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (!over || active.id === over.id) return
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
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
      </DndContext>
    </Suspense>
  )
}

export default Table
