import {
  type MouseEventHandler,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="mx-4 w-full max-w-lg rounded-lg bg-white shadow-xl outline-none"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
