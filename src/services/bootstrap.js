import { getUser } from './auth-client';

export async function bootstrapAppData() {
  const user = await getUser();
  if (!user) {
    return { user: null };
  }

  return { user };
}
