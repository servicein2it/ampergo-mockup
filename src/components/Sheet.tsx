import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export function BottomSheet({
  open,
  onClose,
  children,
  snap = 0.6,
  dim = true,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  snap?: 0.35 | 0.5 | 0.6 | 0.9;
  dim?: boolean;
}) {
  const heightPct = `${Math.round(snap * 100)}%`;
  return (
    <AnimatePresence>
      {open && (
        <>
          {dim && (
            <motion.div
              key="dim"
              className="absolute inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
          <motion.div
            key="sheet"
            className="absolute left-0 right-0 bottom-0 z-40 bg-bg-surface rounded-t-sheet border-t border-border-subtle flex flex-col"
            style={{ height: heightPct }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <div className="pt-2 pb-1 flex justify-center">
              <div className="w-9 h-1 rounded-full bg-ink-disabled" />
            </div>
            <div className="flex-1 overflow-y-auto phone-scroll">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Modal({
  open,
  onClose,
  children,
  width = 320,
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="bg-bg-surface rounded-card border border-border-subtle p-5"
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
