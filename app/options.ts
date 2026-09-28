export type CatalogCategory = "desk" | "chair" | "accessory";
export type ProductKind =
  | "adjustable-desk"
  | "compact-desk"
  | "ergonomic-chair"
  | "task-chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "keyboard";

export interface CatalogItem {
  id: string;
  name: string;
  category: CatalogCategory;
  kind: ProductKind;
  price: number;
  detail: string;
  image?: string;
  maxQty?: number;
}

export const FURNITURE_CATALOG: CatalogItem[] = [
  {
    id: "desk-adjustable",
    name: "Lift standing desk",
    category: "desk",
    kind: "adjustable-desk",
    price: 100,
    detail: "120 × 60 cm · electric height",
    image: "/assets/desk/Mechanical-Adjustable-Desk.png",
  },
  {
    id: "desk-electrical",
    name: "Dual electrical standing desk",
    category: "desk",
    kind: "adjustable-desk",
    price: 120,
    detail: "120 × 60 cm · electric height",
    image: "/assets/desk/Dual-Electrical-Adjustable-Desk.png",
  },
  {
    id: "chair-ergonomic",
    name: "Fantech",
    category: "chair",
    kind: "ergonomic-chair",
    price: 100,
    detail: "Lumbar support · breathable mesh",
    image: "/assets/chair/fantech.png",
  },
  {
    id: "chair-classic",
    name: "Studio chair",
    category: "chair",
    kind: "task-chair",
    price: 65,
    detail: "Padded seat · compact footprint",
    image: "/assets/chair/white-chair.png",
  },
  {
    id: "monitor-xiaomi",
    name: "Xiaomi A24i",
    category: "accessory",
    kind: "monitor",
    price: 150,
    detail: "24 in · Full HD",
    image: "/assets/monitor/24_xiaomi_a24i_2026.png",
    maxQty: 2,
  },
  {
    id: "monitor-studio",
    name: "Studio Display",
    category: "accessory",
    kind: "monitor",
    price: 200,
    detail: "27 in · 5K Retina",
    image: "/assets/monitor/Apple_Studio_Display.png",
    maxQty: 2,
  },
  {
    id: "desk-lamp",
    name: "Task lamp",
    category: "accessory",
    kind: "lamp",
    price: 45,
    detail: "Warm adjustable light",
    image: "/assets/accessories/desk-lamp.png",
    maxQty: 1,
  },
  {
    id: "leaf-plant",
    name: "Tropical plant",
    category: "accessory",
    kind: "plant",
    price: 25,
    detail: "A little green for focus",
    image: "/assets/accessories/plant.png",
    maxQty: 1,
  },
];
