import { Menu } from "src/store/reducers/data";

export interface Tooltip {
  display: boolean;
  menu?: Menu;
  pos?: { x: number; y: number };
}

export const TooltipComponent = ({ tooltip }: { tooltip: Tooltip }) => {    
  if (!tooltip.display || !tooltip.menu) return <></>;  

  const { x, y } = tooltip.pos as { x: number; y: number };
  const menu = tooltip.menu;
  
  const name_words = menu.name.split(" ");
  let lines = [];
  if (name_words.length >= 4) {
    const index = Math.trunc(name_words.length / 2);        
    lines.push(name_words.slice(0, index).join(" "));
    lines.push(name_words.slice(index).join(" "));
  } else {    
    lines.push(menu.name);
  }

  const dy = lines.length > 1 ? 45 : 27;

  const transform = `translate(${x}, ${y - dy})`;
  const visible = tooltip.display ? "visible" : "hidden";

  return (
    <g transform={transform} visibility={visible}>
      <defs>
        <filter
          id="label-background"
          x="-10%"
          y="-25%"
          width="120%"
          height="150%"
        >
          <feFlood floodColor="#333333" />
          <feGaussianBlur stdDeviation="2" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0 1" />
          </feComponentTransfer>

          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1" />
          </feComponentTransfer>
          <feComposite operator="over" in="SourceGraphic" />
        </filter>
      </defs>
      <text
        filter="url(#label-background)"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="0.75rem"        
      >
        {lines.map((line, i) => {
          console.log('line: ', line)          
          return (
            <tspan key={i} textAnchor="middle" x="0" dy="1.2em">
              {line}
            </tspan>
          );
        })}
      </text>
    </g>
  );
};

export default TooltipComponent;
