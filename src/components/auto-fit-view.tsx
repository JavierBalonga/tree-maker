import { useEffect, useRef } from 'react';
import { useReactFlow, useStore } from '@xyflow/react';

function AutoFitView() {
  const nodes = useStore((s) => s.nodes);
  const { fitView } = useReactFlow();

  useEffect(() => {
    fitView();
  }, [nodes]);

  const timer = useRef<number | null>(null);
  useEffect(() => {
    const handleResize = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fitView(), 300);
    };
    if (!window) return;
    window.addEventListener('resize', handleResize);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <></>;
}

export { AutoFitView };
