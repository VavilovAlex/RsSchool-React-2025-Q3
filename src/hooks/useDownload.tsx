import { type Ref, useRef } from "react";

interface Download {
  blob: (blob: Blob, fileName: string) => void;
}

export const useDownload = (): [
  Download,
  Ref<HTMLAnchorElement> | undefined,
] => {
  const ref = useRef<HTMLAnchorElement>(null);

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    console.log(ref.current);
    if (ref.current != null) {
      ref.current.setAttribute("href", url);
      ref.current.setAttribute("download", fileName);
      ref.current.click();
    } else {
      console.error("Ref is null");
    }
    URL.revokeObjectURL(url);
  };

  return [
    {
      blob: downloadBlob,
    },
    ref,
  ];
};
