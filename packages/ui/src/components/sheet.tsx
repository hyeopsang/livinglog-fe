"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "@livinglog/ui/lib/utils";
import { Button } from "@livinglog/ui/components/button";
import { XIcon } from "lucide-react";

/**
 * Renders the Sheet root element used to compose a sheet UI and sets `data-slot="sheet"`.
 *
 * Forwards all received props to the underlying Radix Dialog root component.
 *
 * @param props - Props passed to the Radix Dialog root
 * @returns The root element for the sheet UI
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * Renders a Sheet trigger element that forwards all props and sets `data-slot="sheet-trigger"`.
 *
 * @returns A Sheet trigger element with the provided props applied.
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * Renders a sheet close trigger element with the component's `data-slot` attribute.
 *
 * @returns A Radix `Dialog.Close` element configured with `data-slot="sheet-close"` that forwards all provided props.
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * Renders a portal container for sheet content and marks it with `data-slot="sheet-portal"`.
 *
 * @param props - Props forwarded to the underlying Portal element.
 * @returns The portal element used to host sheet content.
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * Renders the sheet's full-screen overlay with backdrop blur, z-index layering, and open/close animations.
 *
 * @param className - Additional CSS classes merged with the component's base overlay styles
 * @returns The overlay element used behind sheet content
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-white/20 backdrop-blur-sm duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders slide-over sheet content with an overlay and entrance/exit animations.
 *
 * The content is positioned based on the `side` prop and includes a backdrop
 * overlay. When `showCloseButton` is true, a close button is rendered in the
 * top-right of the sheet.
 *
 * @param side - Side from which the sheet appears: `"top"`, `"right"`, `"bottom"`, or `"left"`.
 * @param showCloseButton - Whether to render a close button inside the sheet.
 * @returns The sheet content JSX element (wrapped in a portal with overlay).
 */
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * Renders the sheet header container with default vertical layout and spacing.
 *
 * @returns A `div` element with `data-slot="sheet-header"` that applies default flex-column layout, gap, and padding; merges the provided `className` and forwards remaining `div` props.
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

/**
 * Renders the sheet footer container with default vertical layout, spacing, and padding.
 *
 * @param className - Additional CSS class names to merge with the component's default layout and spacing classes
 * @returns A `div` element used as the sheet footer (has `data-slot="sheet-footer"`)
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

/**
 * Renders a sheet title element with the component's default typography and a `data-slot` for targeting.
 *
 * @param className - Additional CSS classes to merge with the default title styles
 * @returns The sheet title element with merged classes and `data-slot="sheet-title"`
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}

/**
 * Renders the sheet's description element with default muted typography and data-slot.
 *
 * Merges any provided `className` with the component's default `text-sm text-muted-foreground` classes and forwards remaining props to the underlying Radix `SheetPrimitive.Description`.
 *
 * @returns The `SheetPrimitive.Description` element with merged classes and `data-slot="sheet-description"`.
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
