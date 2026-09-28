import type { BuilderCategory, RentalDuration, Setup } from "../constants";
import type { CatalogItem } from "../options";
import { ProductArtwork } from "./product-artwork";
import { formatPrice } from "../utils";

type BuilderPanelProps = {
  setup: Setup;
  category: BuilderCategory;
  items: CatalogItem[];
  monitorCount: number;
  durations: RentalDuration[];
  total: number;
  onCategoryChange: (category: BuilderCategory) => void;
  onApplyPreset: (preset: "developer" | "creative" | "minimal") => void;
  onRandomize: () => void;
  onSelectProduct: (item: CatalogItem, quantity: number) => void;
  onUpdateAccessory: (item: CatalogItem, change: number) => void;
  onSkipChair: () => void;
  onDurationChange: (duration: RentalDuration["id"]) => void;
  onReview: () => void;
};

const categoryLabels: Record<BuilderCategory, string> = {
  desk: "Desk",
  chair: "Chair",
  accessory: "Extras",
};

const thumbnailClassByKind: Partial<Record<CatalogItem["kind"], string>> = {
  "adjustable-desk": "thumbAdjustableDesk",
  "ergonomic-chair": "thumbErgonomicChair",
  "task-chair": "thumbTaskChair",
  lamp: "thumbLamp",
  plant: "thumbPlant",
  keyboard: "thumbKeyboard",
};

export function BuilderPanel({
  setup,
  category,
  items,
  monitorCount,
  durations,
  total,
  onCategoryChange,
  onApplyPreset,
  onRandomize,
  onSelectProduct,
  onUpdateAccessory,
  onSkipChair,
  onDurationChange,
  onReview,
}: BuilderPanelProps) {
  return (
    <div className={`${"panel"} ${"builderPanel"}`}>
      <div className={"panelTopline"}>
        <div>
          <span className={"stepLabel"}>MAKE IT YOURS</span>
          <h2>Pick your pieces</h2>
        </div>
        <button
          className={"randomButton"}
          type="button"
          onClick={onRandomize}
          title="Randomize your setup"
        >
          <span aria-hidden="true">⤨</span> Surprise me
        </button>
      </div>
      <div className={"presetRow"} aria-label="Workspace presets">
        <span>Start with</span>
        <button type="button" onClick={() => onApplyPreset("developer")}>
          Developer
        </button>
        <button type="button" onClick={() => onApplyPreset("creative")}>
          Creative
        </button>
        <button type="button" onClick={() => onApplyPreset("minimal")}>
          Minimal
        </button>
      </div>
      <div className={"categoryTabs"} role="tablist" aria-label="Choose product category">
        {(Object.keys(categoryLabels) as BuilderCategory[]).map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={category === tab}
            className={category === tab ? "active" : ""}
            key={tab}
            onClick={() => onCategoryChange(tab)}
          >
            {categoryLabels[tab]}
            {tab === "accessory" && (
              <span className={"tabCount"}>
                {Object.values(setup.accessories).reduce((sum, qty) => sum + qty, 0)}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className={"selectionContent"}>
        <div className={"selectionHeading"}>
          <div>
            <h3>
              {category === "desk"
                ? "Find your foundation"
                : category === "chair"
                  ? "Settle in comfortably"
                  : "The little things matter"}
            </h3>
            <p>
              {category === "desk"
                ? "One desk, made for your kind of day."
                : category === "chair"
                  ? "Support for the hours that add up."
                  : "Add a few finishing touches."}
            </p>
          </div>
          {category === "chair" && (
            <button className={"skipButton"} type="button" onClick={onSkipChair}>
              Skip chair
            </button>
          )}
        </div>
        <div
          className={`${"productList"} ${category === "accessory" ? "productListAccessory" : ""}`}
        >
          {items.map((item) => {
            const chosen =
              category === "desk"
                ? setup.deskId === item.id
                : category === "chair"
                  ? setup.chairId === item.id
                  : (setup.accessories[item.id] ?? 0) > 0;
            const qty = setup.accessories[item.id] ?? 0;
            return (
              <article
                className={`${"productRow"}${chosen ? ` ${"isSelected"}` : ""}`}
                key={item.id}
              >
                <button
                  className={"productSelect"}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => onSelectProduct(item, qty)}
                >
                  <span className={`${"productThumb"} ${thumbnailClassByKind[item.kind] ?? ""}`}>
                    <ProductArtwork
                      item={item}
                      artworkClassName={"productThumbArtwork"}
                      imageClassName={"productThumbImage"}
                    />
                  </span>
                  <span className={"productCopy"}>
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                    <b>
                      {formatPrice(item.price)} <small>/ month</small>
                    </b>
                  </span>
                  <span
                    className={`${"selectionIndicator"}${chosen ? ` ${"checked"}` : ""}`}
                    aria-hidden="true"
                  >
                    {chosen ? "✓" : "＋"}
                  </span>
                </button>
                {category === "accessory" && chosen && (
                  <div className={"quantityControl"} aria-label={`${item.name} quantity`}>
                    <button
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => onUpdateAccessory(item, -1)}
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      type="button"
                      aria-label={`Add one ${item.name}`}
                      disabled={
                        item.kind === "monitor" ? monitorCount >= 2 : qty >= (item.maxQty ?? 1)
                      }
                      onClick={() => onUpdateAccessory(item, 1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        {category === "accessory" && (
          <p className={"limitNote"}>
            Up to 2 monitors per setup. Swap or remove any extra anytime.
          </p>
        )}
      </div>
      <div className={"rentalOptions"}>
        <div className={"rentalHeading"}>
          <div>
            <h3>How long are you staying?</h3>
            <p>Indicative estimate · final quote confirmed with our team.</p>
          </div>
          <span className={"priceUnit"}>IDR</span>
        </div>
        <div className={"durationOptions"} role="group" aria-label="Rental duration">
          {durations.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`${"durationChoice"}${setup.duration === option.id ? ` ${"selected"}` : ""}`}
              aria-pressed={setup.duration === option.id}
              onClick={() => onDurationChange(option.id)}
            >
              <span>{option.label}</span>
              <small>{option.note}</small>
            </button>
          ))}
        </div>
      </div>
      <div className={"priceBar"}>
        <div className={"priceTotal"}>
          <span className={"priceLabel"}>Estimated total</span>
          <strong className={"priceAmount"}>
            {formatPrice(total)}{" "}
            <small>
              /{setup.duration === "1w" ? "week" : setup.duration === "1m" ? "month" : "3 months"}
            </small>
          </strong>
        </div>
        <button type="button" className={`${"primaryButton"} ${"priceAction"}`} onClick={onReview}>
          Review setup <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
