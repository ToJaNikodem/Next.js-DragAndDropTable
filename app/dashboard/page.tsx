import { getUserId, getUserTable } from '@/models/queries'
import { auth } from '@clerk/nextjs/server'
import Table from '@/components/Table'

async function DashboardPage(): Promise<JSX.Element> {
  const { userId: clerkId } = auth()

  if (!clerkId) return <div>Error</div>
  const userId = await getUserId(clerkId)

  if (!userId) return <div>Error</div>
  const userTable = await getUserTable(userId)

  if (!userTable) return <div>Error</div>
  return (
    <>
      <Table userTable={userTable} />
    </>
  )
}

export default DashboardPage
