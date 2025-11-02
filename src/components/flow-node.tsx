import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Fragment } from 'react/jsx-runtime';

function FlowNode(props: NodeProps) {
  return (
    <>
      <p>
        {String(props.data.label)
          .split('\\n')
          .map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
      </p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export { FlowNode };
