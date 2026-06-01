# Ticket CTA Disabled

The hero and ticket-section CTAs are intentionally rendered as disabled `Button` components without `Link` wrappers.

This keeps the visual disabled state while preventing clicks from navigating to Eventbrite. Restore the commented Eventbrite URL in `sections/Hero.tsx` and `sections/Tickets.tsx`, then wrap the button content with `Link` again when ticket sales should reopen.
