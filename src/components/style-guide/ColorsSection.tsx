import { SwatchGrid } from './Swatch'

const ACCENT = [
  { name: 'Accent', value: '#ff42a5' },
  { name: 'Accent Hover', value: '#ff3392' },
  { name: 'Accent Hot', value: '#ff0096' },
  { name: 'Accent-Dark', value: '#c20568' },
  { name: 'Accent-Dark Hover', value: '#e31776' },
]
const BASE = [
  { name: 'Base 900', value: '#0b0223' }, { name: 'Base 800', value: '#1f1637' },
  { name: 'Base 700', value: '#332a4b' }, { name: 'Base 600', value: '#473e5f' },
  { name: 'Base 500', value: '#5b5273' }, { name: 'Base 400', value: '#797091' },
  { name: 'Base 300', value: '#8d84a5' }, { name: 'Base 200', value: '#a198b9' },
  { name: 'Base 100', value: '#b5accd' }, { name: 'Base 50', value: '#e3dfec' },
]
const STATUS = [
  { name: 'Success', value: '#67c3bb' }, { name: 'Error', value: '#f33621' },
  { name: 'Alert', value: '#de5a48' }, { name: 'Warning', value: '#ffc32a' },
  { name: 'Idle / Link', value: '#0397eb' },
]
const BRAND = [
  { name: 'Logo Purple', value: '#4c4789' }, { name: 'Logo Blue', value: '#51a5c9' },
  { name: 'Logo Green', value: '#398b4d' }, { name: 'Logo Lime', value: '#b3d661' },
  { name: 'Teal', value: '#67c3bb' }, { name: 'Yellow', value: '#ffc32a' },
  { name: 'Sky', value: '#0397eb' }, { name: 'Coral', value: '#f33621' },
  { name: 'Pale', value: '#eee3d9' }, { name: 'Gold (rating)', value: '#ffce47' },
]
const GRADIENT = [
  { name: 'Gradient Purple', value: '#7b4cff' }, { name: 'Gradient Blue', value: '#0ea4c5' },
  { name: 'AI gradient', value: 'linear-gradient(to top right, #0ea4c5, #7b4cff)' },
  { name: 'Page glow', value: 'radial-gradient(60% 80% at 0% 100%, rgba(255,66,165,0.5), transparent 60%), radial-gradient(60% 80% at 100% 100%, rgba(14,164,197,0.4), transparent 60%)' },
]
const TEXT = [
  { name: 'Text Primary', value: '#ffffff' }, { name: 'Text Secondary 80', value: '#ffffffcc' },
  { name: 'Text Tertiary 70', value: '#ffffffb3' }, { name: 'Text Muted 60', value: '#ffffff99' },
  { name: 'Text Faint 50', value: '#ffffff80' }, { name: 'Text Dim 40', value: '#ffffff66' },
]
const WHITE_A = [90, 80, 70, 60, 50, 40, 30, 20, 10].map((n) => ({
  name: `White ${n}`, value: `#ffffff${Math.round((n / 100) * 255).toString(16).padStart(2, '0')}`,
}))
const BLACK_A = [90, 80, 70, 60, 50, 40, 30, 20, 10].map((n) => ({
  name: `Black ${n}`, value: `#000000${Math.round((n / 100) * 255).toString(16).padStart(2, '0')}`,
}))

function Group({ title, items }: { title: string; items: { name: string; value: string }[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-tertiary">{title}</h3>
      <SwatchGrid items={items} />
    </div>
  )
}

export function ColorsSection() {
  return (
    <div className="space-y-8">
      <Group title="Accent" items={ACCENT} />
      <Group title="Base ramp" items={BASE} />
      <Group title="Status" items={STATUS} />
      <Group title="Brand & logo" items={BRAND} />
      <Group title="Gradients" items={GRADIENT} />
      <Group title="Text on dark" items={TEXT} />
      <Group title="Translucents — white" items={WHITE_A} />
      <Group title="Translucents — black" items={BLACK_A} />
    </div>
  )
}
