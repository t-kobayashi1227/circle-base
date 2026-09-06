export function LogoMark({ size }: { size: number }) {
  const s = size / 34;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <span
        className="absolute rounded-full bg-[#F2B32E]"
        style={{ left: 0, top: 3 * s, width: 14 * s, height: 14 * s }}
      />
      <span
        className="absolute rounded-full bg-[#E5911B]"
        style={{ left: 15 * s, top: 0, width: 13 * s, height: 13 * s }}
      />
      <span
        className="absolute rounded-full bg-[#E5911B]"
        style={{ left: 2 * s, top: 17 * s, width: 13 * s, height: 13 * s }}
      />
      <span
        className="absolute rounded-full bg-[#F2B32E]"
        style={{ left: 16 * s, top: 16 * s, width: 15 * s, height: 15 * s }}
      />
    </div>
  );
}
