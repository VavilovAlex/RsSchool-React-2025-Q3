import { type ButtonHTMLAttributes, type MouseEvent, useState } from "react";
import Button from "./Button.tsx";

interface AsyncButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>;
}

export default function AsyncButton(props: AsyncButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const { onClick } = props;

    setIsLoading(true);

    try {
      if (onClick == null) {
        console.warn("onClick is not defined");
      } else {
        await onClick(e);
      }
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  const { children, ...rest } = props;

  const isDisabled = props.disabled || isLoading;

  return (
    <Button {...rest} disabled={isDisabled} onClick={handleClick}>
      {children}
    </Button>
  );
}
