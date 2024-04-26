import { getUserId, getUserTable } from '@/models/queries'
import { auth } from '@clerk/nextjs/server'

async function DashboardPage() {
  const { userId: clerkId } = auth()
  const userId = await getUserId(clerkId!)
  const userTable = await getUserTable(userId!)
  return (
    <>
      <div className="border-black border-2 rounded-md max-w-fit h-4/5  m-auto mt-8">
        <div className='pl-4 pt-2 font-bold'>
          <h2 className='text-xl'>{userTable?.tableName}</h2>
        </div>
        <div className='flex flex-row gap-2 p-2'>
        {userTable!.columns.map((column) => (
          <div
          key={column.index}
          className="w-48 border-2 rounded-md border-stone-600 p-2 flex flex-col gap-2"
          >
            <p className='text-lg'>{column.columnName}</p>
            {column.fields.map((field) => (
              <div
              key={field.index}
              className="h-32 border-2 rounded-md border-stone-400 p-2"
              >
                <p>{field.fieldName}</p>
                <p className='text-sm'>{field.fieldDesc}</p>
                {field.properties.map((property) => (
                  <div key={property.propertyName}>
                    <p className={'text-sm rounded-md px-2 py-1 text-white ' + (property.isActive ? 'bg-green-500' : 'bg-red-500')}>{property.propertyName}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default DashboardPage
