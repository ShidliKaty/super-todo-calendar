import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../lib/classNames";
import cls from "./AddButton.module.scss";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const AddButton = (props: AddButtonProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div className={classNames(cls.AddButton, {}, [className])}>
      <button className={cls.Button} type="button" {...otherProps}>
        {children}
      </button>
    </div>
  );
};

export default AddButton;
