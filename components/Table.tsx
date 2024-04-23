import { getUserId } from '@/models/queries'

async function Table({ clerkId }: { clerkId: string }) {
  const userId = await getUserId(clerkId)

  return <div>Table</div>
}

export default Table
