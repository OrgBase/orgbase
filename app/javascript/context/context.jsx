import { createContext } from 'react';

export const RoomContext = createContext({
  gameSlug: 'ddtq',
  randomFraction: 0.0,
  activeParticipant: {}
});
