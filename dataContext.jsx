import { createContext } from 'react';

const StatusContext = createContext({
  dropDownList: ['Started', 'Pending', 'Done'], // Default value
});

export default {StatusContext};