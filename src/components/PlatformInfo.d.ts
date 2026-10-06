// Types for the platform-specific files (PlatformInfo.android.tsx / .ios.tsx / .web.tsx).
// Metro picks the right file at runtime; TypeScript uses this declaration.
import type { JSX } from "react";

export default function PlatformInfo(): JSX.Element;
