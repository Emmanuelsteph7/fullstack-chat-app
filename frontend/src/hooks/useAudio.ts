import { useEffect, useRef } from "react";

const useAudio = () => {
  const audioContextRef = useRef<AudioContext>(null);
  const audioBufferRef = useRef<AudioBuffer>(null);

  useEffect(() => {
    const initializeAudioContext = async () => {
      try {
        // Create an audio context
        const audioContext = new (window.AudioContext ||
          // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-explicit-any
          (window as any)?.webkitAudioContext)();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (audioContextRef as any).current = audioContext;

        // Load the audio file and decode it
        const response = await fetch("/path-to-sound-file/notification.mp3");
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (audioBufferRef as any).current = audioBuffer;

        // Unlock the audio context on user interaction
        const unlockAudio = () => {
          if (audioContext.state === "suspended") {
            audioContext.resume();
          }
          window.removeEventListener("click", unlockAudio);
        };
        window.addEventListener("click", unlockAudio);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    };

    initializeAudioContext();

    return () => {
      window.removeEventListener("click", () => {});
      if (audioContextRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioContextRef?.current?.close();
      }
    };
  }, []);

  const handlePlayNotification = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      const audioSource = audioContextRef.current.createBufferSource();
      audioSource.buffer = audioBufferRef.current;
      audioSource.connect(audioContextRef.current.destination);
      audioSource.start(0);
    }
  };

  return { handlePlayNotification };
};

export default useAudio;
