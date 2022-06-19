import { SlippiGame } from "@slippi/slippi-js";

declare var FileReaderSync: any;
declare var self: any;


const reader = new FileReaderSync();
const processGame = file => {
  const result = reader.readAsArrayBuffer(file);
  const game = new SlippiGame(new Uint8Array(result));
  const metadata = game.getMetadata();
  const stats = game.getStats();
  return {
    metadata,
    stats,
  };
};

self.onmessage = async ({ data }) => {
  const file = data.file;
  const result = processGame(file);
  self.postMessage(result);
};