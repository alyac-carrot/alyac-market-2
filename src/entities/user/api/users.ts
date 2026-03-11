import axiosInstance from '@/shared/api/axios';

export type UserItem = {
  id: string;
  name: string;
  handle: string;
  tag: string;
  image?: string;
};

type ApiUser = {
  _id: string;
  username: string;
  accountname: string;
  image?: string;
};

export async function searchUsers(keyword: string): Promise<UserItem[]> {
  const q = keyword.trim();
  if (!q) return [];

  const res = await axiosInstance.get<ApiUser[]>('/user/searchuser', {
    params: { keyword: q },
  });

  return res.data.map((u) => ({
    id: u._id,
    name: u.username,
    handle: `@${u.accountname}`,
    tag: '알약',
    image: u.image,
  }));
}
