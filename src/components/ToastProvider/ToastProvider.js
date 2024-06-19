import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);
  useKeyDown("Escape", handleEscape);

  const createToast = React.useCallback(
    (message, variant) => {
      setToasts([...toasts, { message, variant, id: crypto.randomUUID() }]);
    },
    [toasts]
  );

  const dismissToast = React.useCallback(
    (id) => {
      setToasts(toasts.filter((toast) => toast.id !== id));
    },
    [toasts]
  );

  const value = React.useMemo(() => {
    return { toasts, createToast, dismissToast };
  }, [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
