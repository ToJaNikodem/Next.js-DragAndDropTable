import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TableField from './TableField'

export default function TableColumn(props: { column: any }) {
  const items = props.column.fields.map((field: any) => field.index)
  console.log(items)
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <div className="w-48 border-2 rounded-md border-stone-600 p-2 flex flex-col gap-2">
        <p className="text-lg">{props.column.columnName}</p>
        {props.column.fields.map((field: any) => (
          <TableField
            key={field.index}
            field={field}
            columnIndex={props.column.index}
          />
        ))}
      </div>
    </SortableContext>
  )
}
