import { Textarea } from '@/components/ui/textarea';
import { useLocalStorageState } from '@/lib/use-local-storage-state';
import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEffect } from 'react';
import { AutoFitView } from '@/components/auto-fit-view';
import { DownloadFlowButton } from '@/components/download-flow-button';
import { FlowNode } from '@/components/flow-node';
import { generateReactFlowTree } from '@/lib/generate-tree';
import { useDebouncedState } from '@/lib/use-debounced-state';

function App() {
  const [text, setText] = useLocalStorageState<string>('text', defaultText);

  const [flowData, setFlowData] = useDebouncedState<{ nodes: Node[]; edges: Edge[] }>(
    { nodes: [], edges: [] },
    300,
  );

  useEffect(() => {
    setFlowData(generateReactFlowTree(text));
  }, [text]);

  return (
    <div className="flex min-h-svh flex-col gap-4 overflow-hidden p-4">
      <header>
        <h1 className="text-4xl">Tree Maker</h1>
      </header>
      <main className="flex h-0 grow flex-row gap-4">
        <div className="flex w-md flex-col">
          <Textarea
            className="h-0 grow font-mono"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="border-input w-0 grow rounded-md border shadow-xs">
          <ReactFlow
            colorMode="dark"
            nodes={flowData.nodes}
            edges={flowData.edges}
            nodeTypes={{ default: FlowNode }}
            panOnDrag
            elementsSelectable={false}
            nodesConnectable={false}
            nodesDraggable={false}
          >
            <Background />
            <Controls showInteractive={false} />
            <DownloadFlowButton />
            <AutoFitView />
          </ReactFlow>
        </div>
      </main>
    </div>
  );
}

export { App };

const defaultText = `/
= bin
= boot
== grub
=== fonts 
=== locale
= cdrom
= dev
== block
== bsg
== bus
=== usb
==== 001
==== 002`;
