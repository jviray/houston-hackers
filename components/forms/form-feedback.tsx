import { CircleCheckBig, TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FormFeedbackProps {
  status: 'success' | 'error';
  message?: string;
}

export const FormFeedback = ({ status, message }: FormFeedbackProps) => {
  if (!message) return null;

  const icon = {
    success: <CircleCheckBig className="h-4 w-4" />,
    error: <TriangleAlert className="h-4 w-4" />,
  };

  return (
    <div
      className={cn(
        'flex h-10 items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium',
        status === 'error'
          ? 'bg-destructive/15 text-destructive'
          : 'bg-emerald-500/15 text-emerald-500',
      )}
    >
      {icon[status]}
      <p>{message}</p>
    </div>
  );
};
