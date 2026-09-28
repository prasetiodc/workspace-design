import type { RentalDuration } from "../constants";
import type { SelectedItem } from "../utils";
import { formatPrice } from "../utils";

type WorkspaceSummaryProps = {
  selectedItems: SelectedItem[];
  duration: RentalDuration;
  total: number;
  onBack: () => void;
  onRequest: () => void;
};

export function WorkspaceSummary({
  selectedItems,
  duration,
  total,
  onBack,
  onRequest,
}: WorkspaceSummaryProps) {
  return (
    <div className={"panel"}>
      <div className={"summaryTop"}>
        <button className={"backButton"} type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to editing
        </button>
        <span className={"stepLabel"}>YOUR CONFIGURATION</span>
        <h2>Looking good.</h2>
        <p>Here’s what your workspace comes to.</p>
      </div>
      <div className={"summaryList"}>
        {selectedItems.map(({ item, qty }) => (
          <div className={"summaryLine"} key={item.id}>
            <div>
              <strong>
                {item.name}
                {qty > 1 ? ` × ${qty}` : ""}
              </strong>
              <span>{formatPrice(item.price)} / item / month</span>
            </div>
            <b>{formatPrice(item.price * qty * duration.factor)}</b>
          </div>
        ))}
        <div className={`${"summaryLine"} ${"durationLine"}`}>
          <div>
            <strong>Rental period</strong>
            <span>
              {duration.label} · {duration.note}
            </span>
          </div>
          <span>{duration.id === "3m" ? "10% bundle saving" : ""}</span>
        </div>
      </div>
      <div className={`${"priceTotal"} ${"summaryTotal"}`}>
        <span className={"priceLabel"}>Estimated total</span>
        <strong className={`${"priceAmount"} ${"summaryAmount"}`}>
          {formatPrice(total)}{" "}
          <small>
            / {duration.id === "1w" ? "week" : duration.id === "1m" ? "month" : "3 months"}
          </small>
        </strong>
      </div>
      <p className={"availabilityNote"}>
        We’ll confirm availability and delivery details with you after your request.
      </p>
      <button className={`${"primaryButton"} ${"summaryCta"}`} type="button" onClick={onRequest}>
        Request this setup <span aria-hidden="true">↗</span>
      </button>
      <button className={"keepExploring"} type="button" onClick={onBack}>
        Keep exploring
      </button>
    </div>
  );
}
