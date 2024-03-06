import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./AddButton.module.scss";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const AddButton = (props: AddButtonProps) => {
  const { children, ...otherProps } = props;

  return (
    <button className={cls.Button} type="button" {...otherProps}>
      {children}
    </button>
  );
};

export default AddButton;
