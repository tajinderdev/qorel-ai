import { vi } from 'vitest';

// Mock Web Speech API
if (typeof window !== 'undefined') {
  window.speechSynthesis = {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn().mockReturnValue([]),
    onvoiceschanged: null,
    paused: false,
    pending: false,
    speaking: false,
  } as unknown as SpeechSynthesis;

  window.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({
    text,
    lang: 'en-US',
    rate: 1,
    pitch: 1,
    volume: 1,
    onend: null,
    onerror: null,
    onstart: null,
    onpause: null,
    onresume: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof SpeechSynthesisUtterance;
}
