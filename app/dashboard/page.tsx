import { getUserId, getUserTable } from '@/models/queries'
import { auth } from '@clerk/nextjs/server'
import Table from '@/components/Table'

export default async function DashboardPage() {
  const { userId: clerkId } = auth()
  const userId = await getUserId(clerkId!)
  const userTable = await getUserTable(userId!)

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event
  }

  return (
    <>
      <Table userTable={userTable}/>
    </>
  )
}
