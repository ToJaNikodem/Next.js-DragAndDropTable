'use client'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ItemsField } from './Table'

function TableField({
  field,
  fieldId,
  editMode = false,
}: {
  field: ItemsField | undefined
  fieldId: UniqueIdentifier
  editMode: boolean
}): JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fieldId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!field) return <div>Error</div>

  if (!isDragging) {
    return (
      <>
        {editMode ? (
          <div
            ref={setNodeRef}
            className="mt-2 h-32 rounded-md border-2 border-stone-400 p-2"
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
        ) : (
          <div className="mt-2 h-32 rounded-md border-2 border-stone-400 p-2">
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
        )}
      </>
    )
  } else {
    return (
      <div
        ref={setNodeRef}
        className="mt-2 h-32 rounded-md border-2 border-stone-400 p-2 opacity-30"
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
}

export default TableField
