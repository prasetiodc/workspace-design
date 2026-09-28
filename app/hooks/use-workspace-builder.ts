"use client";

import { startTransition, useEffect, useState, type FormEvent } from "react";
import { FURNITURE_CATALOG, type CatalogItem } from "../options";
import {
  CATEGORY_LABELS,
  DEFAULT_SETUP,
  RENTAL_DURATIONS,
  SETUP_PRESETS,
  STORAGE_KEY,
  type BuilderCategory,
  type BuilderView,
  type PresetName,
  type RentalDurationId,
  type Setup,
} from "../constants";
import { countMonitors, findCatalogItem, getSelectedItems } from "../utils";

export function useWorkspaceBuilder() {
  const [setup, setSetup] = useState<Setup>(DEFAULT_SETUP);
  const [category, setCategory] = useState<BuilderCategory>("desk");
  const [view, setView] = useState<BuilderView>("builder");
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Setup>;
        if (parsed.deskId && findCatalogItem(parsed.deskId)?.category === "desk") {
          startTransition(() =>
            setSetup({
              ...DEFAULT_SETUP,
              ...parsed,
              accessories: parsed.accessories ?? DEFAULT_SETUP.accessories,
            }),
          );
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    startTransition(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(setup));
  }, [ready, setup]);

  const selectedItems = getSelectedItems(setup);
  const monthlyTotal = selectedItems.reduce((total, line) => total + line.item.price * line.qty, 0);
  const duration =
    RENTAL_DURATIONS.find((option) => option.id === setup.duration) ?? RENTAL_DURATIONS[1];
  const total = monthlyTotal * duration.factor;
  const monitorCount = countMonitors(setup.accessories);
  const visibleItems = FURNITURE_CATALOG.filter((item) => item.category === category);
  const itemCount = selectedItems.reduce((sum, line) => sum + line.qty, 0);

  function updateAccessory(item: CatalogItem, change: number) {
    setSetup((current) => {
      const currentQty = current.accessories[item.id] ?? 0;
      if (change > 0 && item.kind === "monitor" && monitorCount >= 2) return current;
      const nextQty = Math.max(0, Math.min(item.maxQty ?? 1, currentQty + change));
      const accessories = { ...current.accessories };
      if (nextQty) accessories[item.id] = nextQty;
      else delete accessories[item.id];
      return { ...current, accessories };
    });
  }

  function selectProduct(item: CatalogItem, quantity: number) {
    if (category === "desk") {
      setSetup((current) => ({ ...current, deskId: item.id }));
    } else if (category === "chair") {
      setSetup((current) => ({ ...current, chairId: item.id }));
    } else {
      updateAccessory(item, quantity ? -quantity : 1);
    }
  }

  function applyPreset(preset: PresetName) {
    setSetup((current) => ({ ...SETUP_PRESETS[preset], duration: current.duration }));
  }

  function randomize() {
    const desks = FURNITURE_CATALOG.filter((item) => item.category === "desk");
    const chairs = FURNITURE_CATALOG.filter((item) => item.category === "chair");
    const monitors = FURNITURE_CATALOG.filter((item) => item.kind === "monitor");
    const accessories = FURNITURE_CATALOG.filter(
      (item) => item.category === "accessory" && item.kind !== "monitor",
    );

    const random = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

    const accessory = random(accessories);
    setSetup((current) => ({
      deskId: random(desks).id,
      chairId: random(chairs).id,
      accessories: { [random(monitors).id]: 1, [accessory.id]: 1 },
      duration: current.duration,
    }));
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const request = {
      setup,
      items: selectedItems.map(({ item, qty }) => ({
        id: item.id,
        name: item.name,
        qty,
        monthlyPrice: item.price,
      })),
      total,
      contact: Object.fromEntries(values.entries()),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("monis-rent-last-request", JSON.stringify(request));
    setSubmitted(true);
  }

  function openRequestForm() {
    setContactOpen(true);
    setSubmitted(false);
  }

  return {
    setup,
    category,
    setCategory,
    view,
    contactOpen,
    submitted,
    selectedItems,
    duration,
    total,
    monitorCount,
    visibleItems,
    itemCount,
    categoryLabels: CATEGORY_LABELS,
    durations: RENTAL_DURATIONS,
    applyPreset,
    randomize,
    updateAccessory,
    selectProduct,
    skipChair: () => setSetup((current) => ({ ...current, chairId: null })),
    setDuration: (durationId: RentalDurationId) =>
      setSetup((current) => ({ ...current, duration: durationId })),
    showSummary: () => setView("summary"),
    returnToBuilder: () => setView("builder"),
    openRequestForm,
    closeRequestForm: () => setContactOpen(false),
    submitRequest,
  };
}
