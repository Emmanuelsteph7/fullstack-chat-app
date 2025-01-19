import { create } from "zustand";
import newMessageSound from "../assets/audio/new-message-audio.mp3";
import newMessageSound2 from "../assets/audio/new-message-2-audio.mp3";
import sendMessageAudio from "../assets/audio/send-message.mp3";

export interface ISoundStore {
  isSoundSet: boolean;
}

interface ISoundStoreAction {
  handlePlayInitial: () => void;
  handlePlayNewMessageSound: () => void;
  handlePlayNewMessageSound2: () => void;
  handlePlaySendMessage: () => void;
}

export const useSoundStore = create<ISoundStore & ISoundStoreAction>(
  (set, get) => ({
    isSoundSet: false,
    handlePlayInitial: () => {
      const { isSoundSet } = get();
      if (isSoundSet) return;

      const audio = new Audio(newMessageSound);
      const audio2 = new Audio(newMessageSound2);
      const sendMessage = new Audio(sendMessageAudio);
      audio.muted = true;
      audio2.muted = true;
      sendMessage.muted = true;

      audio.play();
      audio2.play();
      sendMessage.play();
      set({ isSoundSet: true });
    },
    handlePlayNewMessageSound: () => {
      const audio = new Audio(newMessageSound);
      audio.play();
    },
    handlePlayNewMessageSound2: () => {
      const audio = new Audio(newMessageSound2);
      audio.play();
    },
    handlePlaySendMessage: () => {
      const audio = new Audio(sendMessageAudio);
      audio.play();
    },
  })
);
