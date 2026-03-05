// import axiosInstance from '@/shared/api/axios';
// import type { MyInfoResponse, UpdateProfileBody, UpdateProfileResponse } from '../model/types';
// // 내 정보
// export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/user/myinfo');
// // 검색
// // 프로필 수정 (명세 반영: { user: { ... } })
// export const updateMyProfile = (body: UpdateProfileBody) =>
//   axiosInstance.put<UpdateProfileResponse>('/user', {
//     user: body,
//   });
// import axiosInstance from '@/shared/api/axios';
// import type { MyInfoResponse, UpdateProfileBody, UpdateProfileResponse } from '../model/types';
// // 내 정보
// export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/user/myinfo');
// // 프로필 수정
// export const updateMyProfile = (body: UpdateProfileBody) =>
//   axiosInstance.put<UpdateProfileResponse>('/user', {
//     user: body,
//   });
import axiosInstance from '@/shared/api/axios';

import type { MyInfoResponse, UpdateProfileBody, UpdateProfileResponse } from '../model/types';

// 내 정보
export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/user/myinfo');

// 검색
export const searchUsers = (keyword: string) =>
  axiosInstance.get<unknown>('/user/search', {
    params: { keyword },
  });

//  프로필 수정
export const updateMyProfile = (body: UpdateProfileBody) =>
  axiosInstance.put<UpdateProfileResponse>('/user', {
    user: body,
  });
