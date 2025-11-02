import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getViewportForBounds, Panel, useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { DownloadIcon } from 'lucide-react';

interface DownloadFlowButtonProps {
  fileName?: string;
  imageWidth?: number;
  imageHeight?: number;
}

function DownloadFlowButton({
  fileName = 'flow-image',
  imageWidth = 2560,
  imageHeight = 1440,
}: DownloadFlowButtonProps) {
  const { getNodes, getNodesBounds } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0, 2, 0.05);
    const element: HTMLElement | null = document.querySelector('.react-flow__viewport');
    if (!element) return;
    toPng(element, {
      backgroundColor: '#141414',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', `${fileName}.png`);
      a.setAttribute('href', dataUrl);
      a.click();
    });
  };

  return (
    <Panel position="top-right">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={onClick}>
            <DownloadIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Download Image</p>
        </TooltipContent>
      </Tooltip>
    </Panel>
  );
}

export { DownloadFlowButton };
