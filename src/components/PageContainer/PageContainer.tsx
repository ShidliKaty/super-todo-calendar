import { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import cls from "./PageContainer.module.scss";

interface PageContainerProps {
  className?: string;
  children: ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
  const { className, children } = props;
  return (
    <div className={classNames(cls.PageContainer, {}, [className])}>
      {children}
    </div>
  );
};

export default PageContainer;
