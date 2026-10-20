// Regression: accent changes must not recolor categorical blue components.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(name)=>fs.readFileSync(`docs/frontend/design/components/${name}/styles.md`,'utf8');
const maps=(name)=>[...read(name).matchAll(/```css\n([\s\S]*?)\n```/g)].flatMap(m=>[...m[1].matchAll(/(:root|\.dark)\s*\{([^{}]*)\}/g)].map(x=>({selector:x[1],tokens:Object.fromEntries([...x[2].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map(v=>[v[1],v[2].trim()]))})));
const purple={'--accent-50':'#faf5ff','--accent-500':'#9333ea','--accent-800':'#6b21a8','--accent-200':'#e9d5ff'};
const resolve=(map,key,seen=[])=>{assert(!seen.includes(key),'cycle');const value=map[key];assert(value!==undefined,`missing ${key}`);return value.replace(/var\((--[a-z0-9-]+)\)/g,(_,ref)=>resolve(map,ref,[...seen,key]));};
for(const dark of [false,true])for(const order of [['Chip','Tab','PageHeader'],['PageHeader','Tab','Chip']]){
 let map={...purple};for(const name of order)for(const rule of maps(name))if(rule.selector===':root'||dark)Object.assign(map,rule.tokens);
 const actual={mode:dark?'dark':'light',order:order.join(' -> '),blueSurface:resolve(map,'--chip-subtle-blue'),blueText:resolve(map,'--chip-text-blue'),tabSurface:resolve(map,'--tab-count-selected-surface'),tabText:resolve(map,'--tab-count-selected-text')};
 assert.equal(actual.blueSurface,dark?'#003585':'#ebf3ff');assert.equal(actual.blueText,dark?'#99c2ff':'#0066ff');assert.equal(actual.tabSurface,dark?purple['--accent-800']:purple['--accent-50']);assert.equal(actual.tabText,dark?purple['--accent-200']:purple['--accent-500']);console.log(JSON.stringify(actual));
}
for(const name of ['Tab','PageHeader'])assert(!read(name).match(/--chip-(?:subtle|text)-blue\s*:/),`${name} overwrites categorical blue`);
const css=fs.readFileSync('docs/frontend/design/components/Tab/implementation/css.md','utf8');assert(css.includes('background: "var(--tab-count-selected-surface)"'));assert(css.includes('color: "var(--tab-count-selected-text)"'));console.log('PASS: purple accent and reversed token loading preserve blue Chip; only selected Tab count consumes accent tokens');
