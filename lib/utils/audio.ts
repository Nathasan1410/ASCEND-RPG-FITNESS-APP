import { Howl } from "howler";

// Placeholder sounds - in a real app these would be local files
const sounds = {
  click: new Howl({ src: ["/sounds/click.mp3"], volume: 0.5 }),
  hover: new Howl({ src: ["/sounds/hover.mp3"], volume: 0.2 }),
  success: new Howl({ src: ["/sounds/success.mp3"], volume: 0.6 }),
  levelUp: new Howl({ src: ["/sounds/levelup.mp3"], volume: 0.8 }),
  error: new Howl({ src: ["/sounds/error.mp3"], volume: 0.5 }),
};

export function playSound(type: keyof typeof sounds) {
  try {
    // Check if sound file exists/loaded logic would go here
    // sounds[type].play();
    console.log(`[Audio] Playing ${type}`);
  } catch (e) {
    // Ignore audio errors
  }
}
