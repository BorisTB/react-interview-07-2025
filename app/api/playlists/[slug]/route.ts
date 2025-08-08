import { mockDb } from '@/app/api/playlists/mock.db';

export const dynamic = 'force-static';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const playlist = mockDb.get(params?.slug);

  return Response.json({ playlist });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  mockDb.delete(params?.slug);

  return Response.json({ status: 'ok' });
}
