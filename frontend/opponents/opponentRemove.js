import { getGlobal, setGlobal } from '../globals.js'

export default function opponentRemove(message) {
    console.log('[opponentRemove]:', message);
    let userMap = getGlobal('userMap');
    userMap.delete(message);
    setGlobal('userMap', userMap);
}