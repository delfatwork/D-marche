'use client';

import { useRef, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

export function Modal({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  onCancel,
  isDangerous = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Fermer à Échap
      if (e.key === 'Escape') {
        onCancel();
        return;
      }

      // Piège focus : Tab doit rester dans la modale
      if (e.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        if (!focusables || focusables.length === 0) return;

        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey) {
          // Shift+Tab au premier élément → aller au dernier
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          // Tab au dernier élément → aller au premier
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus initial : premier bouton
    const firstButton = modalRef.current?.querySelector('button') as HTMLElement;
    firstButton?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onCancel}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? 'modal-description' : undefined}
        >
          <h2
            id="modal-title"
            className="text-2xl font-bold text-neutral-900 mb-3"
          >
            {title}
          </h2>

          {description && (
            <p
              id="modal-description"
              className="text-base text-neutral-600 mb-6"
            >
              {description}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className={`
                flex-1 px-4 py-3 rounded-md font-semibold text-base
                border-2 border-neutral-200 text-neutral-900
                hover:bg-neutral-100 hover:border-primary
                transition-colors
                focus-visible:outline-2 focus-visible:outline-primary
                focus-visible:outline-offset-2
              `}
            >
              {cancelLabel}
            </button>

            <button
              onClick={onConfirm}
              className={`
                flex-1 px-4 py-3 rounded-md font-semibold text-base
                text-white transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2
                ${
                  isDangerous
                    ? `bg-danger hover:bg-danger-hover focus-visible:outline-danger`
                    : `bg-primary hover:bg-primary-hover focus-visible:outline-primary`
                }
              `}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
