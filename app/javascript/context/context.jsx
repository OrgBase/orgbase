import { createContext } from 'react';

export const RoomContext = createContext({
  panelType: '',
  panelId: -1,
  randomFraction: 0.0
});
