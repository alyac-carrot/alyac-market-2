import { useState } from 'react';

import type { PostViewMode } from '@/entities/profile';

export function useProfileViewState() {
  const [postViewMode, setPostViewMode] = useState<PostViewMode>('normal');
  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  return {
    postViewMode,
    deleteTargetPostId,
    setPostViewMode,
    setDeleteTargetPostId,
  };
}
