import { atom } from 'jotai';

interface props {
  mic: boolean;
  vid?: 'camera' | 'screen';
}

const mediaStore = atom<props>({
  mic: true,
  vid: 'camera',
});

export default mediaStore;
