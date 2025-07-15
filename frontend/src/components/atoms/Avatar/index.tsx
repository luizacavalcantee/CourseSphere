interface AvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar = ({ src, alt, size = 'medium', className }: AvatarProps) => {
  const sizeClasses = {
    small: 'h-10 w-10',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
  };

  const baseClasses = 'rounded-full object-cover border-2 border-gray-200';

  return (
    <img
      src={src}
      alt={alt}
      className={
        [baseClasses, sizeClasses[size], className].filter(Boolean).join(' ')
      }
    />
  );
};
