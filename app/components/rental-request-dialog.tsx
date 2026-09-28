import type { FormEvent } from "react";
import type { RentalDuration } from "../constants";
import { formatPrice } from "../utils";

type RentalRequestDialogProps = {
  submitted: boolean;
  duration: RentalDuration;
  total: number;
  onClose: () => void;
  onReturnToBuilder: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const RentalRequestDialog = ({
  submitted,
  duration,
  total,
  onClose,
  onReturnToBuilder,
  onSubmit,
}: RentalRequestDialogProps) => {
  return (
    <div
      className={"modalBackdrop"}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={"requestModal"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
      >
        <button
          className={"modalClose"}
          type="button"
          aria-label="Close request form"
          onClick={onClose}
        >
          ×
        </button>
        {submitted ? (
          <div className={"successState"}>
            <span className={"successMark"}>✓</span>
            <p className={"stepLabel"}>ALL SET</p>
            <h2 id="request-title">Your setup is saved.</h2>
            <p className={"successCopy"}>
              Your rental request is ready. Our team will confirm availability and delivery details.
            </p>
            <button
              className={`${"primaryButton"} ${"successButton"}`}
              type="button"
              onClick={() => {
                onClose();
                onReturnToBuilder();
              }}
            >
              Back to my workspace
            </button>
          </div>
        ) : (
          <>
            <p className={"stepLabel"}>ONE LAST THING</p>
            <h2 id="request-title">Where should we reach you?</h2>
            <p className={"modalIntro"}>
              Share a few details and we’ll help get your Bali workspace ready.
            </p>
            <form className={"requestForm"} onSubmit={onSubmit}>
              <label>
                Your name
                <input name="name" autoComplete="name" required placeholder="Rani Putri" />
              </label>
              <label>
                Email or WhatsApp
                <input
                  name="contact"
                  autoComplete="email"
                  required
                  placeholder="you@example.com or +62…"
                />
              </label>
              <label>
                Delivery address in Bali
                <textarea
                  name="address"
                  autoComplete="street-address"
                  required
                  placeholder="Villa, street, area…"
                  rows={3}
                />
              </label>
              <label>
                When do you need it?
                <input name="startDate" type="date" required />
              </label>
              <div className={"formTotal"}>
                <span>{duration.label} · estimated total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className={`${"primaryButton"} ${"formSubmit"}`} type="submit">
                Save rental request <span aria-hidden="true">↗</span>
              </button>
              <p className={"formNote"}>
                No payment now. We’ll confirm availability with you first.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
};
