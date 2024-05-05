'use client'

import LoadingPage from '@/app/dashboard/loading'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { Suspense } from 'react'
import TableColumn from './TableColumn'

export default function Table(props: { userTable: any }) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id === over?.id) {
      return
    }

  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="border-black border-2 rounded-md max-w-fit h-4/5  m-auto mt-8">
          <div className="pl-4 pt-2 font-bold">
            <h2 className="text-xl">{props.userTable.tableName}</h2>
          </div>
          <div className="flex flex-row gap-2 p-2">
            {props.userTable!.columns.map((column: any) => (
              <TableColumn key={column.index} column={column} />
            ))}
          </div>
        </div>
      </DndContext>
    </Suspense>
  )
}
