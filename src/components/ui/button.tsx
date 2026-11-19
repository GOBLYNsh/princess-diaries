import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const buttonVariants = (variant?: string, size?: string) => {
  const base = 'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-xl transition-all duration-300',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all duration-300',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-md transition-all duration-300',
    ghost: 'hover:bg-accent hover:text-accent-foreground transition-colors duration-300',
    link: 'underline-offset-4 hover:underline text-primary hover:text-primary/90 transition-colors duration-300',
  };

  const sizes: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-full px-3',
    lg: 'h-12 rounded-full px-6 text-base',
    icon: 'h-10 w-10',
  };

  return cn(base, variants[variant || 'default'] || variants.default, sizes[size || 'default'] || sizes.default);
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    return (
      <Comp
        className={cn(buttonVariants(variant, size), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };