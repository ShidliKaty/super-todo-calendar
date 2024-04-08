import { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import cls from "./ExpandedList.module.scss";

interface ExpandedListProps {
  className?: string;
  children: ReactNode;
  isHidden: boolean;
}

const ExpandedList = (props: ExpandedListProps) => {
  const { className, children, isHidden } = props;
  return (
    <div
      className={classNames(
        cls.animationContainer,
        { [cls.hidden]: isHidden },
        [className]
      )}
    >
      {children}
    </div>
  );
};

export default ExpandedList;
