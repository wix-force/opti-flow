import { create } from 'zustand';
import { Services } from '@/entities';

interface ServiceStore {
  services: Services[];
  setServices: (services: Services[]) => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
}));
