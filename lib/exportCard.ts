import html2canvas from "html2canvas";

export async function renderCardToCanvas(elementId: string): Promise<HTMLCanvasElement | null> {
  const element = document.getElementById(elementId);
  if (!element) return null;

  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });
}

export async function renderCardToBlob(elementId: string): Promise<Blob | null> {
  const canvas = await renderCardToCanvas(elementId);
  if (!canvas) return null;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export async function downloadCard(elementId: string, filename = "singe-score") {
  const canvas = await renderCardToCanvas(elementId);
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function copyCardToClipboard(elementId: string): Promise<boolean> {
  const blob = await renderCardToBlob(elementId);
  if (!blob) return false;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch {
    return false;
  }
}

export async function shareCard(elementId: string, text: string): Promise<boolean> {
  const blob = await renderCardToBlob(elementId);
  if (!blob) return false;

  const file = new File([blob], "singe-score.png", { type: "image/png" });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        text,
        files: [file],
      });
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
