import { ButtonHTMLAttributes } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Mods, classNames } from "../../utils/classNames";
import cls from "./AddButton.module.scss";
import { Icon } from "@chakra-ui/react";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  main?: boolean;
  secondary?: boolean;
}

const AddButton = (props: AddButtonProps) => {
  const { className, main, secondary, ...otherProps } = props;

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
      <Icon as={BsPlusLg} boxSize={6} />
    </button>
  );
};

export default AddButton;
