import { ButtonHTMLAttributes, ReactNode } from "react";
import { Mods, classNames } from "../../utils/classNames";
import cls from "./AddButton.module.scss";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  main?: boolean;
  secondary?: boolean;
}

const AddButton = (props: AddButtonProps) => {
  const { className, children, main, secondary, ...otherProps } = props;

  const mods: Mods = {
    [cls.btnMain]: main,
    [cls.btnSecondary]: secondary,
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className])}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default AddButton;
