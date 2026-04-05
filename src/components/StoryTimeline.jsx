import { Coffee, Plane, Gem, Mail } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const milestones = [
  {
    icon: Coffee,
    title: 'First meeting',
    date: 'Monsoon 2019',
    text: 'A chance introduction over filter coffee and laughter at a friend’s gathering in Lucknow — the kind of evening neither of us wanted to end.',
  },
  {
    icon: Plane,
    title: 'First trip together',
    date: 'Winter 2021',
    text: 'Udaipur’s palaces and lake reflections mirrored what we already felt — that adventure is sweeter when shared.',
  },
  {
    icon: Gem,
    title: 'The proposal',
    date: 'Spring 2025',
    text: 'Under a sky full of fairy lights, with families hiding behind curtains and hearts in throats — she said yes.',
  },
  {
    icon: Mail,
    title: 'Wedding announcement',
    date: '2026',
    text: 'With our parents’ blessings and your love, we invite you to celebrate as two families become one.',
  },
]

function TimelineItem({ item, index }) {
  const [ref, visible] = useScrollReveal()
  const Icon = item.icon
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-6 md:gap-0 items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="hidden md:block flex-1" />
      <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-champagne to-champagne-light flex items-center justify-center shadow-lg border-4 border-ivory text-maroon">
        <Icon className="w-6 h-6" />
      </div>
      <div
        className={`flex-1 w-full max-w-md transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className={`glass-card rounded-2xl p-6 border border-white/60 hover:shadow-2xl hover:border-champagne/30 hover:-translate-y-1 transition-all duration-300 ${
            isLeft ? 'md:mr-8 md:text-right' : 'md:ml-8'
          }`}
        >
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:hidden w-12 h-12 rounded-full bg-champagne/30 flex items-center justify-center text-maroon">
              <Icon className="w-6 h-6" />
            </div>
            <div className={isLeft ? 'md:text-right md:ml-auto' : ''}>
              <p className="text-champagne text-xs uppercase tracking-widest">{item.date}</p>
              <h3 className="font-display text-2xl text-maroon">{item.title}</h3>
            </div>
          </div>
          <p className="text-maroon/75 text-sm leading-relaxed">{item.text}</p>
        </div>
      </div>
    </div>
  )
}

export default function StoryTimeline() {
  return (
    <section id="story" className="py-20 sm:py-28 px-4 bg-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush-soft/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Our story</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">Every chapter led here</h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-champagne/0 via-champagne/50 to-champagne/0 hidden md:block -translate-x-1/2" />
          <div className="flex flex-col gap-12 md:gap-16">
            {milestones.map((m, i) => (
              <TimelineItem key={m.title} item={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
