import { useAmp } from "next/amp";

export default function AmpMode({ children, ampOnly }) {
  const isAmp = useAmp();
  if (ampOnly) {
    return isAmp ? children : null;
  }
  return isAmp ? null : children;
}
