interface Props { percent: number; width?: number; height?: number; color?: string; }

export default function ProgressBar({ percent, width = 200, height = 6, color = 'var(--accent-primary)' }: Props) {
  return (
    <div style={{ width, height, background: 'var(--bg-card)', borderRadius: height / 2, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <div style={{
        width: `${Math.min(100, percent)}%`, height: '100%',
        background: color, borderRadius: height / 2,
        transition: 'width 0.4s ease',
      }} />
    </div>
  );
}
