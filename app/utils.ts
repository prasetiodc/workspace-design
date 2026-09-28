import { FURNITURE_CATALOG, type CatalogItem } from "./options";
import type { Setup } from "./constants";

export type SelectedItem = { item: CatalogItem; qty: number };

export function formatPrice(amount: number) {
  return `Rp ${Math.round(amount).toLocaleString("id-ID")}k`;
}

export function findCatalogItem(id: string) {
  return FURNITURE_CATALOG.find((item) => item.id === id);
}

export function getSelectedItems(setup: Setup): SelectedItem[] {
  return [setup.deskId, setup.chairId, ...Object.keys(setup.accessories)].flatMap((id) => {
    const item = id ? findCatalogItem(id) : undefined;
    return item
      ? [{ item, qty: id && item.category === "accessory" ? (setup.accessories[id] ?? 0) : 1 }]
      : [];
  });
}

export function countMonitors(accessories: Record<string, number>) {
  return Object.entries(accessories).reduce(
    (sum, [id, qty]) => sum + (findCatalogItem(id)?.kind === "monitor" ? qty : 0),
    0,
  );
}
