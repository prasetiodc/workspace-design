import type { CSSProperties } from "react";
import type { Setup } from "../constants";
import type { CatalogItem } from "../options";
import { findCatalogItem } from "../utils";
import { ProductArtwork } from "./product-artwork";

function SceneAccessory({
  item,
  index,
  monitorIndex,
  monitorCount,
}: {
  item: CatalogItem;
  index: number;
  monitorIndex: number;
  monitorCount: number;
}) {
  const singleMonitorClass =
    item.kind === "monitor" && monitorCount === 1 ? "sceneMonitorSingle" : "";
  const style = { "--item-index": index, "--monitor-index": monitorIndex } as CSSProperties;
  return (
    <div
      className={`${"sceneAccessory"} ${sceneClassesByKind[item.kind] ?? ""} ${singleMonitorClass}`}
      style={style}
      aria-label={item.name}
    >
      <ProductArtwork
        item={item}
        imageClassName={item.kind === "monitor" ? "monitorImage" : undefined}
      />
    </div>
  );
}

const sceneClassesByKind: Partial<Record<CatalogItem["kind"], string>> = {
  monitor: "sceneMonitor",
  plant: "scenePlant",
  lamp: "sceneLamp",
  keyboard: "sceneKeyboard",
};

export function WorkspacePreview({ setup }: { setup: Setup }) {
  const desk = findCatalogItem(setup.deskId);
  const chair = setup.chairId ? findCatalogItem(setup.chairId) : undefined;
  const selectedAccessories = Object.entries(setup.accessories).flatMap(([id, qty]) => {
    const item = findCatalogItem(id);
    return item ? Array.from({ length: qty }, (_, index) => ({ item, key: `${id}-${index}` })) : [];
  });
  const monitorIndexes = new Map(
    selectedAccessories
      .filter(({ item }) => item.kind === "monitor")
      .map(({ key }, index) => [key, index]),
  );

  return (
    <div className={"roomStage"} aria-label="Live workspace preview">
      {selectedAccessories.map(({ item, key }, index) => (
        <SceneAccessory
          key={key}
          item={item}
          index={index}
          monitorIndex={monitorIndexes.get(key) ?? 0}
          monitorCount={monitorIndexes.size}
        />
      ))}
      {desk && (
        <div className={"sceneDesk"}>
          <ProductArtwork item={desk} imageClassName={"deskImage"} />
        </div>
      )}
      {chair && (
        <div
          className={`${"sceneChair"} ${chair.kind === "task-chair" ? "sceneTaskChair" : ""} ${chair.id === "chair-ergonomic" ? "sceneFantech" : ""}`}
        >
          <ProductArtwork item={chair} imageClassName={"chairImage"} />
        </div>
      )}
      <div className={"sceneCaption"}>
        <span className={"liveDot"} /> Live preview <span>Changes as you build</span>
      </div>
    </div>
  );
}
