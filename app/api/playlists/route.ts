import { mockDb } from '@/app/api/playlists/mock.db';

export const dynamic = 'force-static';

export async function GET() {
  const playlists = Array.from(mockDb.values());
  return Response.json({ playlists });
}
