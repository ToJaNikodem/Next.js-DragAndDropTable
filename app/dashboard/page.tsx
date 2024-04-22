import Table from "@/components/Table";
import { auth } from "@clerk/nextjs/server";

function DashboardPage() {
  const { userId: clerkId } = auth()
  return (
    <>
      <main>
        <Table clerkId={clerkId as string}></Table>
      </main>
    </>
  )
}

export default DashboardPage
