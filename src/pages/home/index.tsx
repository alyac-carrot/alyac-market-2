import { Button } from '@/shared/ui';
import { AlertDialog } from '@/shared/ui';

export function HomePage() {
  return (
    <div>Home
    <Button>Click me</Button>
    <AlertDialog>
        <Button variant="outline">Open Alert Dialog</Button>
         </AlertDialog>
  </div>
  )
}
