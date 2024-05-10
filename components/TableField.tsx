'use client'

import { Field } from '@/models/queries'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TableField({
  field,
  fieldId,
}: {
  field: Field
  fieldId: UniqueIdentifier
}): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: fieldId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      className="h-32 rounded-md border-2 border-stone-400 p-2"
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{field.fieldName}</p>
      <p className="text-sm">{field.fieldDesc}</p>
      {field.properties.map((property) => (
        <div key={property.propertyName}>
          <p
            className={
              'rounded-md px-2 py-1 text-sm text-white ' +
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

export default TableField
