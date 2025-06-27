import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
  zIndex?: number;
}

const ModalPortal = ({ children, zIndex = 99 }: ModalPortalProps) => {
  const modalRoot = document.getElementById("modal-root") ?? document.body;
  return createPortal(
    <div style={{ zIndex, position: "relative" }}>{children}</div>,
    modalRoot
  );
};

export default ModalPortal;
