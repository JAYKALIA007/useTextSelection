import { useState, useEffect, useCallback, useRef } from "react";

export const useTextSelection = () => {
  const [selectionData, setSelectionData] = useState("");
  const selectionRef = useRef(null);

  const expandTextNodeRange = (node, start, end) => {
    const text = node.textContent || "";

    while (start > 0 && /\S/.test(text[start - 1])) start--;
    while (end < text.length && /\S/.test(text[end])) end++;

    return { start, end };
  };

  const handleSelection = useCallback((range) => {
    const newRange = range.cloneRange();

    // Handle start node
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      const { start } = expandTextNodeRange(
        range.startContainer,
        range.startOffset,
        range.startOffset
      );
      newRange.setStart(range.startContainer, start);
    }

    // Handle end node
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      const { end } = expandTextNodeRange(
        range.endContainer,
        range.endOffset,
        range.endOffset
      );
      newRange.setEnd(range.endContainer, end);
    }

    return newRange;
  }, []);

  const handleMouseUp = useCallback((e) => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) {
      selectionRef.current && handleOutsideClick(e);
      return;
    }

    const newRange = handleSelection(range);
    const selectedText = newRange.toString().trim();

    if (selectedText) {
      selection.removeAllRanges();
      selection.addRange(newRange);
      selectionRef.current = newRange.cloneRange();
      setSelectionData(selectedText);
    }
  }, []);

  const handleOutsideClick = useCallback((e) => {
    if (!selectionRef.current) return;

    const rect = selectionRef.current.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    isOutside && clearTextSelection();
  }, []);

  const clearTextSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    setSelectionData("");
    selectionRef.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleMouseUp, handleOutsideClick]);

  return { selectionData, clearTextSelection };
};
