import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "x-dot-face-auto-capture": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "x-dot-face-auto-capture-ui": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
