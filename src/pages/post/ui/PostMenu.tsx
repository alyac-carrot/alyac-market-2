import { MoreVertical } from 'lucide-react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';

interface Props {
  isMyPost: boolean;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onReportRequest: () => void;
}

export function PostMenu({ isMyPost, onEdit, onDeleteRequest, onReportRequest }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="게시글 옵션">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" sideOffset={8} className="w-40 p-0">
        <div className="flex flex-col py-2">
          <div className="bg-muted mx-auto mb-2 h-1 w-8 rounded-full" />

          {isMyPost ? (
            <>
              <MenuButton onClick={onEdit}>수정</MenuButton>
              <MenuButton onClick={onDeleteRequest} destructive>삭제</MenuButton>
            </>
          ) : (
            <MenuButton onClick={onReportRequest} destructive>신고</MenuButton>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MenuButton({
  onClick,
  destructive = false,
  children,
}: {
  onClick: () => void;
  destructive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full px-4 py-3 text-sm ${
        destructive ? 'text-red-500' : 'text-foreground'
      }`}
    >
      {children}
    </button>
  );
}
