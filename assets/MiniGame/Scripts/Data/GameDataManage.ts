import { setIntForKey, getIntForKey, getBoolForKey, setBoolForKey, getStringForKey, setStringForKey, getObjectForKey, setObjectForKey } from './LocalDataManager';

export const getLvCanPlay = () => getIntForKey('LEVEL_CAN_PLAY', 1);

export const setLvCanPlay = (lvCanPlay) => setIntForKey('LEVEL_CAN_PLAY', lvCanPlay);

export const getPause = () => getBoolForKey('PAUSE', true);

export const setPause = (isPause) => setBoolForKey('PAUSE', isPause);

export const getBomb = () => getBoolForKey('Bomb', true);

export const setBomb = (Bomb) => setBoolForKey('Bomb', Bomb);

export const getRocket = () => getBoolForKey('Rocket', true);

export const setRocket = (Rocket) => setBoolForKey('Rocket', Rocket);

export const getLighting = () => getIntForKey('Lighting', 0);

export const setLighting = (lighting) => setIntForKey('Lighting', lighting);

export const getLevel = () => getIntForKey('Level', 1);

export const setLevel = (level) => setIntForKey('Level', level);

export const getScore = () => getIntForKey('Score', 0);

export const setScore = (Score) => setIntForKey('Score', Score);

export const getMode = () => getIntForKey('Mode', 0);

export const setMode = (Mode) => setIntForKey('Mode', Mode);

export const getHightScore = () => getIntForKey('HightScore', 0);

export const setHightScore = (HightScore) => setIntForKey('HightScore', HightScore);

export const getIDChar = () => getIntForKey('IDChar', 0);

export const setIDChar = (IDChar) => setIntForKey('IDChar', IDChar);

export const getBestTop: () => Array<number> = () => getObjectForKey(`BestTop`, [0, 0, 0]);

export const setBestTop = (Star: Array<number>) => setObjectForKey(`BestTop`, Star);
