import jsyaml from "js-yaml";
import { generateCards } from "./bingo";
import { renderCards } from "./render";
import type { BingoConfig } from "./types";

async function loadConfig(): Promise<BingoConfig> {
  const res = await fetch("/bingo.config.yaml");
  if (!res.ok) throw new Error(`Failed to load bingo.config.yaml: HTTP ${res.status}`);
  const text = await res.text();
  return jsyaml.load(text) as BingoConfig;
}

function regenerate(config: BingoConfig): void {
  const cards = generateCards(config, 8);
  renderCards(cards);
}

async function main(): Promise<void> {
  let config: BingoConfig;
  try {
    config = await loadConfig();
  } catch (err) {
    const container = document.getElementById("cards-container");
    if (container) {
      container.innerHTML = `<p class="error">Failed to load config: ${err instanceof Error ? err.message : String(err)}</p>`;
    }
    return;
  }

  if (config.options.length < 24) {
    const container = document.getElementById("cards-container");
    if (container) {
      container.innerHTML = `<p class="error">bingo.config.yaml must have at least 24 options (found ${config.options.length}).</p>`;
    }
    return;
  }

  regenerate(config);

  document.getElementById("regenerate-btn")?.addEventListener("click", () => regenerate(config));
}

main();
