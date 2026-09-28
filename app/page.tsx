"use client";

import { BuilderPanel } from "./components/builder-panel";
import { RentalRequestDialog } from "./components/rental-request-dialog";
import { WorkspacePreview } from "./components/workspace-preview";
import { WorkspaceSummary } from "./components/workspace-summary";
import { useWorkspaceBuilder } from "./hooks/use-workspace-builder";

export default function Home() {
  const builder = useWorkspaceBuilder();

  return (
    <main className={"appShell"}>
      <header className={"topbar"}>
        <a className={"brand"} href="#top" aria-label="Workspace Builder home">
          <span className={"brandMark"}>m</span>
          <span>Workspace Builder</span>
        </a>
        <div className={"topbarCenter"}>
          <span className={"topbarPin"}>Bali, Indonesia</span>
          <span className={"topbarDivider"} />
          Workspace builder
        </div>
        <a className={"helpLink"} href="mailto:hello@monis.rent">
          Need a hand?
        </a>
      </header>

      <section className={"builderLayout"} aria-label="Workspace builder">
        <div className={"previewColumn"}>
          <div className={"previewHeading"}>
            <div>
              <span className={"previewKicker"}>THE ROOM</span>
              <h2>Your Bali setup</h2>
            </div>
            <span className={"itemCount"}>{builder.itemCount} items</span>
          </div>
          <WorkspacePreview setup={builder.setup} />
          <div className={"previewFoot"}>
            <span>Designed for long days & slow mornings.</span>
            <span>Availability confirmed after request</span>
          </div>
        </div>

        {builder.view === "builder" ? (
          <BuilderPanel
            setup={builder.setup}
            category={builder.category}
            items={builder.visibleItems}
            monitorCount={builder.monitorCount}
            durations={builder.durations}
            total={builder.total}
            onCategoryChange={builder.setCategory}
            onApplyPreset={builder.applyPreset}
            onRandomize={builder.randomize}
            onSelectProduct={builder.selectProduct}
            onUpdateAccessory={builder.updateAccessory}
            onSkipChair={builder.skipChair}
            onDurationChange={builder.setDuration}
            onReview={builder.showSummary}
          />
        ) : (
          <WorkspaceSummary
            selectedItems={builder.selectedItems}
            duration={builder.duration}
            total={builder.total}
            onBack={builder.returnToBuilder}
            onRequest={builder.openRequestForm}
          />
        )}
      </section>

      {builder.contactOpen && (
        <RentalRequestDialog
          submitted={builder.submitted}
          duration={builder.duration}
          total={builder.total}
          onClose={builder.closeRequestForm}
          onReturnToBuilder={builder.returnToBuilder}
          onSubmit={builder.submitRequest}
        />
      )}

      <footer className={"pageFooter"}>
        <span>Made for the way you work in Bali.</span>
        <span>Build it. See it. Rent it.</span>
      </footer>
    </main>
  );
}
