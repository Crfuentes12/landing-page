// components/ui/custom-alert.tsx
import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomAlertProps {
  variant: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function CustomAlert({
  variant = 'default',
  title,
  description,
  icon,
  className,
  children,
  ...props
}: CustomAlertProps) {
  // Define variant styles
  const variantStyles = {
    default: 'bg-background border-border text-foreground',
    destructive: 'bg-destructive/15 text-destructive border-destructive/30 dark:border-destructive/30',
    warning: 'bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
    success: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    info: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  };

  // Define default icons
  const defaultIcons = {
    default: null,
    destructive: <AlertCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  };

  const IconComponent = icon || defaultIcons[variant];

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children || (
        <>
          {(IconComponent || title) && (
            <div className="flex items-center gap-3">
              {IconComponent && (
                <div className="flex-shrink-0">{IconComponent}</div>
              )}
              {title && <h5 className="font-medium">{title}</h5>}
            </div>
          )}
          {description && (
            <div className={`text-sm ${(IconComponent || title) ? 'mt-2 ml-6' : ''}`}>
              {description}
            </div>
          )}
        </>
      )}
    </div>
  );
}