import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { users } from '@/models/models'

const db = drizzle(sql)

export async function POST(request: Request): Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await request.json()
  const body = JSON.stringify(payload)

  const webhook = new Webhook(WEBHOOK_SECRET)

  let event: WebhookEvent

  try {
    event = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const { id: userId } = event.data
  const eventType = event.type

  if (eventType === 'user.created') {
    await db.insert(users).values({
      clerkId: userId,
    })
  }

  return new Response('', { status: 200 })
}
