import Dagre from '@dagrejs/dagre';
import type { Edge as ReactFlowEdge, Node as ReactFlowNode } from '@xyflow/react';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 40;

function generateReactFlowTree(text: string): {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
} {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'LR' });

  const nodes: ReactFlowNode[] = [];
  const edges: ReactFlowEdge[] = [];

  const lines = text.split('\n');
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.trim() === '') continue;
    if (line.trim().includes('---')) break;
    const indent = line.match(/^=+/)?.[0].length || 0;
    const label = line.substring(indent).trim();
    const id = `node-${index}`;

    g.setNode(id, { label, width: NODE_WIDTH, height: NODE_HEIGHT });
    nodes.push({ id, data: { label }, position: { x: 0, y: 0 } });

    let parentId: string | null = null;
    for (let i = index - 1; i >= 0; i--) {
      const parentLine = text.split('\n')[i];
      const parentIndent = parentLine.match(/^=+/)?.[0].length || 0;
      if (parentIndent < indent) {
        parentId = `node-${i}`;
        break;
      }
    }

    if (parentId) {
      g.setEdge(parentId, id);
      edges.push({ id: `edge-${parentId}-${id}`, source: parentId, target: id });
    }
  }

  Dagre.layout(g);

  nodes.forEach((node) => {
    const position = g.node(node.id);
    if (position) {
      node.position = {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - NODE_HEIGHT / 2,
      };
    }
  });

  return { nodes, edges };
}

export { generateReactFlowTree };
