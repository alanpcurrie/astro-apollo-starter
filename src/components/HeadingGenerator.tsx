import React from "react";

type Level =  1 | 2 | 3 | 4 | 5 | 6;
type WithDynamicTagProps = {
  className?: string;
  children: React.ReactNode;
};

const isValidClassName = (className: string | undefined): boolean => 
  className !== undefined && className !== '';

const combineClassNames = (...classes: (string | undefined)[]): string =>
  classes.filter(isValidClassName).join("-");


const withDynamicTag = (level: Level, baseClassName: string) => {
  return (additionalClassName?: string) => {
    return ({ className, children }: WithDynamicTagProps) => {
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      const combinedClassName = combineClassNames(baseClassName, additionalClassName, className);      
        return <Tag className={combinedClassName}>{children}</Tag>;
    };
  };
};

export const HeadingOneBase = withDynamicTag(1, "m-text-heading");
export const HeadingOneBase2Xl = HeadingOneBase("2xl");
export const HeadingOne2Xl = withDynamicTag(1, "m-text-heading")("2xl");
export const HeadingOneXl = withDynamicTag(1, "m-text-heading")("xl");
export const HeadingTwoMd = withDynamicTag(2, "m-text-heading")("md");

export const SimpleHeading2xl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h1 className="m-heading 2xl">{children}</h1>;
};
