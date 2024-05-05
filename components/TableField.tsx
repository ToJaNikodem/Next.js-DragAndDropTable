"use client"

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function TableField(props: { field: any, columnIndex: number }) {
  const itemId = props.columnIndex + '-' + props.field.index
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.field.index })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      className="h-32 border-2 rounded-md border-stone-400 p-2"
      style={style} {...attributes} {...listeners}
    >
      <p>{props.field.fieldName}</p>
      <p className="text-sm">{props.field.fieldDesc}</p>
      {props.field.properties.map((property: any) => (
        <div key={property.propertyName}>
          <p
            className={
              'text-sm rounded-md px-2 py-1 text-white ' +
              (property.isActive ? 'bg-green-500' : 'bg-red-500')
            }
          >
            {property.propertyName}
          </p>
        </div>
      ))}
    </div>
  )
}
