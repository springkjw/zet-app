import { useState } from "react";

export function useModal() {
  const [isConfirm, onConfirm] = useState<boolean>(false);

  return { isConfirm, onConfirm };
}
