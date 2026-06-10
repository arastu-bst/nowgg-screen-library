// Color swatch over a checkerboard so translucent values read correctly.
export function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-14 w-full overflow-hidden rounded-m border border-line bg-[repeating-conic-gradient(#3a3550_0%_25%,#26233a_0%_50%)] bg-[length:16px_16px]">
        <div className="size-full" style={{ background: value }} />
      </div>
      <div className="leading-tight">
        <p className="truncate text-2xs font-medium text-text-primary">{name}</p>
        <p className="font-mono text-3xs uppercase text-text-dim">{value}</p>
      </div>
    </div>
  )
}

export function SwatchGrid({ items }: { items: { name: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {items.map((s) => (
        <Swatch key={s.name + s.value} {...s} />
      ))}
    </div>
  )
}
