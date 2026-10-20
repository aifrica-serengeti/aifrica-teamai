import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
const root=process.cwd();
const probe=fs.mkdtempSync(path.join(os.tmpdir(),'teamai-header-tab-regression-'));
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const blocks=f=>[...read(f).matchAll(/```tsx\n([\s\S]*?)\n```/g)].map(m=>m[1]);
const strip=s=>s.replace(/^import[\s\S]*?;\s*$/gm,'');
const icon=strip(blocks('docs/frontend/design/components/IconButton/implementation/typescript.md')[0]);
const headerBlocks=blocks('docs/frontend/design/components/PageHeader/implementation/typescript.md');
const headerApi=headerBlocks[0];
const tab=strip(blocks('docs/frontend/design/components/Tab/implementation/typescript.md')[1]);
const wrapper=headerBlocks.find(s=>s.includes('export function PageHeaderIconAction'));
const bridgeJsx=headerBlocks.find(s=>s.includes('<header')).match(/<Tab\n[\s\S]*?\/>/)[0];
const prelude=`declare namespace JSX { interface IntrinsicElements { [name: string]: any } }
namespace React {
 export type ReactNode = unknown;
 export type ComponentProps<T> = { id?: string; className?: string; type?: string; disabled?: boolean; children?: unknown; 'aria-label'?: string; onClick?: (event:any) => void };
 export function createElement(tag: unknown, props: any, ...children: unknown[]) { return { tag: typeof tag === 'function' ? tag.name : tag, props: {...props,children} }; }
 const state: any[]=[]; const refs:any[]=[]; let cursor=0;
 export function resetHooks(){cursor=0;}
 export function clearHooks(){state.length=0;refs.length=0;cursor=0;}
 export function useState<T>(initial:T):[T,(value:T)=>void]{const i=cursor++;if(!(i in state))state[i]=initial;return [state[i],(value:T)=>{state[i]=value;}];}
 export function useRef<T>(initial:T):{current:T}{const i=cursor++;return refs[i]??(refs[i]={current:initial});}
}
type ComponentProps<T> = React.ComponentProps<T>;
type ReactNode = React.ReactNode;
type IconSize = 't'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl';
type SystemIconName = string;
const cn=(...v:unknown[])=>v.join(' ');
const Icon=(props:any)=>props; const Chip=(props:any)=>props;
const Tooltip=(props:any)=>props; const TooltipTrigger=(props:any)=>props; const TooltipContent=(props:any)=>props;
const Tabs=(props:any)=>props; const TabsList=(props:any)=>props; const TabsTrigger=(props:any)=>props; const TabsContent=(props:any)=>props;
const iconButtonBase='base'; const iconButtonSize={tiny:'tiny',medium:'medium',xlarge:'xlarge'}; const iconButtonVariant={outlined:'outlined',ghost:'ghost'};
const triggerContent='content'; const triggerIcon='icon'; const triggerLabel='label'; const triggerCount='count';
`;
const harness=`
function HeaderTabBridge({tabs, tabValue, defaultTabValue, onTabValueChange, tabsDisabled=false, tabsAriaLabel='페이지 탭'}:PageHeaderProps){return (${bridgeJsx});}
function nodes(tree:any):any[]{if(Array.isArray(tree))return tree.flatMap(nodes);if(!tree||typeof tree!=='object')return [];return [tree,...nodes(tree.props?.children)];}
function find(tree:any,tag:string){return nodes(tree).find(x=>x.tag===tag);}
function assert(condition:any,message:string){if(!condition)throw Error(message);}
const items=[{value:'basic',label:'기본',content:'basic panel'},{value:'audit',label:'이력',disabled:true,content:'audit panel'}];
let selected='basic';const onSelect=(value:string)=>{selected=value;};
const bridge=HeaderTabBridge({tabs:items,tabValue:selected,onTabValueChange:onSelect,tabsDisabled:true,tabsAriaLabel:'리소스 상세 탭'});
assert(bridge.props.value==='basic'&&bridge.props.disabled===true&&bridge.props['aria-label']==='리소스 상세 탭','Header did not forward controlled Tab props');
const navigation=Tab(bridge.props);
assert(find(navigation,'TabsList').props['aria-label']==='리소스 상세 탭','tablist name missing');
assert(nodes(navigation).filter(x=>x.tag==='TabsContent').length===0,'Header rendered duplicate panels');
assert(nodes(navigation).filter(x=>x.tag==='TabsTrigger').every(x=>x.props.disabled),'group disabled missing');
find(navigation,'Tabs').props.onValueChange('audit');assert(selected==='audit','page state callback missing');
const uncontrolled=HeaderTabBridge({tabs:items,defaultTabValue:'audit'});assert(uncontrolled.props.defaultValue==='audit','uncontrolled default missing');
const withPanels=Tab({tabs:items});assert(nodes(withPanels).filter(x=>x.tag==='TabsContent').length===2,'default content behavior changed');
assert(nodes(withPanels).filter(x=>x.tag==='TabsTrigger').map(x=>Boolean(x.props.disabled)).join(',')==='false,true','per-item disabled missing');
React.clearHooks();let activated=0;
const actionProps={icon:'trash',label:'리소스 삭제',tooltip:'삭제',suppressTooltipOnFocusReturn:true,onClick:()=>{activated++;}};
function renderAction(){React.resetHooks();return PageHeaderIconAction(actionProps);}
let action=renderAction();assert(find(action,'IconButton').props['aria-label']==='리소스 삭제','action label not mapped');
find(action,'Tooltip').props.onOpenChange(true);action=renderAction();assert(action.props.open===true,'initial hover did not open');
find(action,'IconButton').props.onClick({});action=renderAction();assert(action.props.open===false&&activated===1,'action did not close Tooltip or invoke page');
find(action,'Tooltip').props.onOpenChange(true);action=renderAction();assert(action.props.open===false,'activation opened Tooltip');
find(action,'span').props.onFocusCapture();find(action,'Tooltip').props.onOpenChange(true);action=renderAction();assert(action.props.open===false,'restored focus opened Tooltip');
find(action,'span').props.onPointerMove({movementX:1,movementY:0});find(action,'Tooltip').props.onOpenChange(true);action=renderAction();assert(action.props.open===true,'new pointer interaction did not resume Tooltip');
React.clearHooks();actionProps.suppressTooltipOnFocusReturn=false;action=renderAction();find(action,'IconButton').props.onClick({});find(action,'Tooltip').props.onOpenChange(true);action=renderAction();assert(action.props.open===true,'normal refresh did not reopen on next interaction');
console.log('PASS: Header controlled/uncontrolled Tab bridge, tablist name, group/item disabled, content ownership, action accessible label, callback, Tooltip close/focus suppression/resume');
`;
const file=path.join(probe,'probe.tsx');fs.writeFileSync(file,prelude+icon+headerApi+tab+wrapper+harness);
const compile=spawnSync('tsc',['--jsx','react','--target','ES2022','--module','commonjs','--skipLibCheck','--outDir',path.join(probe,'out'),file],{encoding:'utf8'});console.log('tsc exit',compile.status,compile.stdout,compile.stderr);if(compile.status!==0)process.exitCode=1;
else{const run=spawnSync('node',[path.join(probe,'out/probe.js')],{encoding:'utf8'});console.log('runtime exit',run.status,run.stdout,run.stderr);if(run.status!==0)process.exitCode=1;}
console.log('probe directory',probe);
