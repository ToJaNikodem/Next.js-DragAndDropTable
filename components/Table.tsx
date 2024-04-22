'use client'
import { getUserId } from '@/models/queries'
import { useEffect } from 'react'

function Table({ clerkId }: { clerkId: string }) {
  useEffect(() => {
    const main = async () => {
      try {
        const userId = await getUserId(clerkId)
        console.log(userId)
      } catch (error) {
        console.error(error)
      }
    }
    main()
  })

  return <div>Table</div>
}

export default Table
