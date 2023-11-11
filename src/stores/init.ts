import { match } from "ts-pattern";
import { blipsStore, type Blip } from "./radarStore";
import blips from "@data/blips";

export function initializeBlipsStore() {
  blipsStore.set(blips);
}

type BlipAction =
  | { type: "ADD_BLIP"; blip: Blip }
  | { type: "UPDATE_BLIP"; blip: Blip }
  | { type: "REMOVE_BLIP"; id: string };

export const handleBlipAction = (action: BlipAction) => {
  match(action)
    .with({ type: "ADD_BLIP" }, ({ blip }) => {
      blipsStore.set([...blipsStore.get(), blip]);
    })
    .with({ type: "UPDATE_BLIP" }, ({ blip }) => {
      blipsStore.set(
        blipsStore.get().map((b) => (b.id === blip.id ? blip : b)),
      );
    })
    .with({ type: "REMOVE_BLIP" }, ({ id }) => {
      blipsStore.set(blipsStore.get().filter((b) => b.id !== id));
    })
    .exhaustive();
};
