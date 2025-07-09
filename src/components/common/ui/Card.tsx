import { ColorsEnum, SizesEnum, VariantsEnum } from 'src/core/enums/tam.enums';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizesEnum;
  variant?: VariantsEnum;
  color?: ColorsEnum;
  icon?: JSX.Element | null;
  title?: string;
}

export const Card = ({
  size = SizesEnum.Medium,
  variant = VariantsEnum.Filled,
  color = ColorsEnum.Primary,
  icon = null,
  title = '',
  children,
  ...props
}: CardProps) => {
  const getSizes = () => {
    switch (size) {
      case SizesEnum.Small:
        return 'p-3 text-sm';
      case SizesEnum.Medium:
        return 'p-5 text-base';
      case SizesEnum.Large:
        return 'p-7 text-lg';
      default:
        return 'p-5 text-base';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case ColorsEnum.Primary:
        return 'primary';
      case ColorsEnum.Success:
        return 'success';
      case ColorsEnum.Danger:
        return 'danger';
      case ColorsEnum.Warning:
        return 'warning';
      case ColorsEnum.Accent:
        return 'accent';
      case ColorsEnum.Secondary:
        return 'secondary';
      case ColorsEnum.Muted:
        return 'muted';
      case ColorsEnum.White:
        return 'white';
      default:
        return color;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case VariantsEnum.Filled:
        return `bg-${getColorClasses()} text-white`;
      case VariantsEnum.Outline:
        return `border border-${getColorClasses()} text-${getColorClasses()} bg-transparent`;
      case VariantsEnum.Muted:
        return `bg-gray-50 text-gray-800 border border-gray-200`;
      case VariantsEnum.White:
        return `bg-white text-${getColorClasses()} border border-gray-200`;
      default:
        return `bg-white text-gray-800 border border-gray-100`;
    }
  };

  return (
    <div
      {...props}
      className={`rounded-xl shadow-md transition hover:shadow-lg ${getSizes()} ${getVariantClasses()} ${props.className ?? ''}`}
    >
      {title && (
        <div className="mb-2 flex items-center font-semibold">
          {icon && <span className="mr-2">{icon}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
};
