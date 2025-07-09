import { SizesEnum, VariantsEnum, ColorsEnum } from 'src/core/enums/tam.enums';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizesEnum;
  variant?: VariantsEnum;
  color?: ColorsEnum;
  icon?: JSX.Element;
}
export const Button: React.FC<ButtonProps> = ({
  color = ColorsEnum.Primary,
  size = SizesEnum.Medium,
  variant = VariantsEnum.Filled,
  icon = null,
  ...props
}) => {
  const getSizes = () => {
    switch (size) {
      case SizesEnum.Small:
        return 'px-4 h-9 text-xs';
      case SizesEnum.Medium:
        return 'px-6 h-10 text-sm';
      case SizesEnum.Large:
        return 'px-8 h-12 text-base';
      default:
        return 'px-6 h-10 text-sm';
    }
  };
  const getVariantWithColor = () => {
    switch (variant) {
      case VariantsEnum.Filled:
        return `text-white bg-${getColorClasses()} hover:bg-${getColorClasses()}-600 focus:ring-2 focus:ring-bg-${getColorClasses()}-600`;
      case VariantsEnum.Outline:
        return `bg-transparent border border-${getColorClasses()} text-${getColorClasses()} hover:bg-${getColorClasses()} hover:text-white focus:bg-${getColorClasses()} focus:border-0 focus:text-white`;
      case VariantsEnum.Link:
        return `bg-transparent hover:text-${getColorClasses()}-600 text-${getColorClasses()}`;
      case VariantsEnum.Muted:
        return `text-${getColorClasses()} dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-20 hover:bg-opacity-20 bg-opacity-10 focus:ring-2 bg-muted`;
      case VariantsEnum.White:
        return `text-${getColorClasses()} bg-white hover:bg-${getColorClasses()} hover:text-white`;
      default:
        return `bg-transparent hover:text-${getColorClasses()}-600 text-${getColorClasses()}`;
    }
  };
  const getColorClasses = () => {
    switch (color) {
      case ColorsEnum.Success:
        return 'success';
      case ColorsEnum.Danger:
        return 'danger';
      case ColorsEnum.Warning:
        return 'warning';
      case ColorsEnum.Accent:
        return 'accent';
      case ColorsEnum.Primary:
        return 'primary';
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
  return (
    <button
      {...props}
      aria-label={props['aria-label']}
      className={`inline-flex items-center ${getSizes()} ${getVariantWithColor()} justify-center rounded disabled:cursor-not-allowed disabled:opacity-40 ${
        props.className ?? ''
      }`}
    >
      {icon ? (
        <>
          <span className="mx-2 inline-block">{props.children}</span>
          <span className="inline-block">{icon}</span>
        </>
      ) : (
        <span>{props.children}</span>
      )}
    </button>
  );
};
