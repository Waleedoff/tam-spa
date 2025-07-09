import { ColorsEnum, SizesEnum, VariantsEnum } from 'src/core/enums/tam.enums';
// import ComponentLoader from './componentLoader';
// import './dynamic-classes';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizesEnum;
  variant?: VariantsEnum;
  color?: ColorsEnum;
  icon?: JSX.Element | null;
  isLoading?: boolean;
}

export const Button = ({
  color = ColorsEnum.Primary,
  size = SizesEnum.Medium,
  variant = VariantsEnum.Filled,
  icon = null,
  isLoading = false,
  ...props
}: ButtonProps) => {
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
      case VariantsEnum.Gradual:
        return `text-white bg-gradient-custom hover:bg-hover-gradient-custom`;
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
      case ColorsEnum.Gradual:
        return 'gradual';
      default:
        return color;
    }
  };

  return (
    <button
      {...props}
      className={`relative inline-flex items-center ${getSizes()} ${getVariantWithColor()} rounded-btn-custom justify-center disabled:cursor-not-allowed disabled:opacity-40 ${
        props.className ?? ''
      }`}
    >
      {isLoading && (
        <div className="rounded-btn-custom absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
          <div className="absolute w-9">
            {/* <ComponentLoader color={ColorsEnum.Muted} /> */}
          </div>
        </div>
      )}
      {icon ? (
        <>
          <span className="mr-1 inline-block">{icon}</span>
          <span className="mr-2 inline-block">{props.children}</span>
        </>
      ) : (
        <span>{props.children}</span>
      )}
    </button>
  );
};
