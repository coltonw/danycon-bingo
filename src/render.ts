import { getFitClass } from "./fittext";
import type { BingoCard } from "./types";

const FREE_SPACE_ROW = 2;
const FREE_SPACE_COL = 2;

function createCell(text: string, isFreeSpace: boolean): HTMLTableCellElement {
  const td = document.createElement("td");
  if (isFreeSpace) td.classList.add("free-space");

  // Wrap content in a div so aspect-ratio enforces square cells independently
  // of the table layout algorithm.
  const inner = document.createElement("div");
  inner.classList.add("cell-inner", getFitClass(text));
  inner.textContent = text;

  td.appendChild(inner);
  return td;
}

function createCardElement(card: BingoCard, index: number): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("card");

  const label = document.createElement("div");
  label.classList.add("card-label");
  label.textContent = `Card ${index + 1}`;
  wrapper.appendChild(label);

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (let r = 0; r < 5; r++) {
    const tr = document.createElement("tr");
    for (let c = 0; c < 5; c++) {
      const isFreeSpace = r === FREE_SPACE_ROW && c === FREE_SPACE_COL;
      tr.appendChild(createCell(card[r][c], isFreeSpace));
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}

/** Clears the cards container and renders all cards into it. */
export function renderCards(cards: BingoCard[]): void {
  const container = document.getElementById("cards-container");
  if (!container) throw new Error("Missing #cards-container element");
  container.innerHTML = "";
  cards.forEach((card, i) => container.appendChild(createCardElement(card, i)));
}
