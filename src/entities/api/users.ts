import axiosInstance from '@/shared/api/axios';

export type UserItem = {
  id: string;
  name: string;
  handle: string;
  tag: string;
};

export async function searchUsers(q: string) {
  const res = await axiosInstance.get<UserItem[]>('/users/search', {
    params: { q },
  });

  return res.data;
}
