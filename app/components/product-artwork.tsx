import Image from "next/image";
import type { CatalogItem, ProductKind } from "../options";

const artworkClassByKind: Partial<Record<ProductKind, string>> = {
  "compact-desk": "compactDesk",
  "ergonomic-chair": "ergonomicChair",
  "task-chair": "taskChair",
  monitor: "monitor",
  lamp: "lamp",
  plant: "plant",
  keyboard: "keyboard",
};

type ProductArtworkProps = {
  item: CatalogItem;
  artworkClassName?: string;
  imageClassName?: string;
};

export function ProductArtwork({
  item,
  artworkClassName = "",
  imageClassName = "",
}: ProductArtworkProps) {
  if (item.image) {
    return (
      <Image className={imageClassName} src={item.image} alt={item.name} width={250} height={240} />
    );
  }

  return (
    <div
      className={`artwork ${artworkClassByKind[item.kind] ?? ""} ${artworkClassName}`}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
