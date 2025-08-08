import { mockDb } from '@/app/api/playlists/mock.db';

export const dynamic = 'force-static';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (mockDb.has(params.slug)) {
    return Response.error();
  }
  const anyKey = Array.from(mockDb.keys()).at(0) || '';

  if (!mockDb.has(anyKey)) {
    return Response.error();
  }

  const playlistData = mockDb.get(anyKey);
  // @ts-ignore
  mockDb.set(params.slug, playlistData);

  return Response.json({ playlist: mockDb.get(params.slug) });
}
