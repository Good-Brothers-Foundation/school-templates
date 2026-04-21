// components/Features.tsx
const features = [
  { title: "Active Learning", color: "bg-pink-50 text-pink-500", icon: "💡" },
  { title: "Expert Teachers", color: "bg-blue-50 text-blue-500", icon: "👩‍🏫" },
  { title: "100% Safe Campus", color: "bg-cyan-50 text-cyan-500", icon: "🛡️" },
  { title: "Modern Curriculum", color: "bg-red-50 text-red-400", icon: "🎓" },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center">
              {/* Organic Shape Icon Wrapper */}
              <div className={`mb-6 flex h-32 w-40 items-center justify-center transition-transform group-hover:scale-105 ${item.color} shadow-sm`}
                style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}>
                <div className="bg-white p-4 rounded-full shadow-inner text-3xl">
                    {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-700">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}