import { useState } from 'react';
import { Copy, Film, RefreshCw, Share2 } from 'lucide-react';

const scenes = {
  high: [
    ['“ഇവൻ ഫ്രണ്ട് അല്ല... കുടുംബക്കാരനാണ്! 😂”', 'ചാക്കോച്ചൻ ചായക്കടയിൽ', 'അക്കൗണ്ട് ക്ലിയർ. ഹൃദയം ഓവർഡ്രാഫ്റ്റ് ഇല്ല.'],
    ['“ഈ കൂട്ടുകാരന് score അല്ല... സ്നേഹത്തിന്റെ GST തന്നെ കൊടുക്കണം! ✨”', 'മിന്നു മിസ് ഫ്രണ്ട്ഷിപ്പ്', 'എല്ലാ പ്ലാനും സമയത്ത്. അത്ഭുതം തന്നെ.']
  ],
  medium: [
    ['“ചങ്ങായി... വിശ്വസിക്കാം. പക്ഷേ പൈസ കൊടുക്കണ്ട. 💀”', 'ബിജു ബ്രോ, ലോൺ ഓഫീസിൽ', 'ഫ്രണ്ട്ഷിപ്പ് approved. Wallet pending.'],
    ['“നല്ല മനുഷ്യൻ തന്നെ... പക്ഷേ ‘5 minutes’ എന്ന് പറഞ്ഞാൽ ഒരു മണിക്കൂർ കാത്തിരിക്ക്! 😭”', 'അപ്പു അണ്ണൻ, ബസ് സ്റ്റോപ്പിൽ', 'റേറ്റിംഗ് നല്ലത്. സമയബോധം വിദേശത്ത്.']
  ],
  low: [
    ['“ഇവന് ₹500 കൊടുത്താൽ... ₹500 പോയി എന്ന് കരുതിക്കോ! 😂”', 'സോമൻ സാർ, കടം ചോദിക്കുന്ന വഴിയിൽ', 'റിപ്പേമെന്റ് ഹിസ്റ്ററി: ഒരു വലിയ suspense.'],
    ['“ഫ്രണ്ട് ആണോ? ഫുഡ് കണ്ടാൽ ബന്ധം മറക്കും! 🍟💀”', 'ലിജോ ലീല, അവസാന ഫ്രൈയുടെ മുന്നിൽ', 'സ്നേഹം ഉണ്ട്. ഫ്രൈ സുരക്ഷിതമല്ല.']
  ],
  veryLow: [
    ['“ഇവനോട് പൈസ ചോദിച്ചാൽ പോലും... നീയാണ് തെറ്റുകാരൻ! 💀”', 'രാഘവൻ രാജാവ്, കോടതിയിൽ', 'Friendship account temporarily frozen.'],
    ['“അഞ്ച് മിനിറ്റ് എന്ന് പറഞ്ഞു... അഞ്ചാം ദിവസം എത്തി! 😭”', 'ഷിബു ഷാജി, ടൈം സോണിൽ', 'സമയം പോയി. Score മാത്രം ബാക്കി.']
  ]
};

function tier(score) { return score >= 800 ? 'high' : score >= 600 ? 'medium' : score >= 300 ? 'low' : 'veryLow'; }
export function RoastScene({ friend, score }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [shared, setShared] = useState(false);
  const scene = scenes[tier(score)][sceneIndex % scenes[tier(score)].length];
  function playAgain() { setSceneIndex((index) => index + 1); setShared(false); }
  async function share() { const text = `FRIENDSCORE™ movie verdict for ${friend}: ${score}/900\n${scene[0]}`; try { if (navigator.share) await navigator.share({ title: 'FriendScore Roast', text }); else { await navigator.clipboard.writeText(text); setShared(true); } } catch { setShared(false); } }
  return <section className="fs-roast-scene" aria-live="polite"><div className="fs-roast-film"><div className="fs-roast-topline"><span><Film size={14} /> FICTIONAL MALAYALAM MOVIE ROAST SCENE</span><span>SCENE {sceneIndex + 1}</span></div><div className="fs-roast-spotlight" /><div className="fs-roast-verdict">SCORE VERDICT: {score} / 900</div><blockquote>{scene[0]}</blockquote><div className="fs-roast-character"><strong>{scene[1]}</strong><span>{scene[2]}</span></div><small>Not an actual movie scene. Just harmless friend drama. 🎬</small></div><div className="fs-roast-actions"><button className="fs-button fs-button-dark" onClick={playAgain}><RefreshCw size={15} /> PLAY ROAST AGAIN</button><button className="fs-button fs-button-share" onClick={share}><Share2 size={15} /> {shared ? 'ROAST COPIED' : 'SHARE ROAST'}</button></div></section>;
}
