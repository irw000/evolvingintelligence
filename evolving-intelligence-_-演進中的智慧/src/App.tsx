import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  Users, 
  Activity, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface ContentItem {
  title: string;
  description: string;
  link?: string;
}

interface NetworkMember {
  name: string;
  role: string;
  title: string;
  bio: string;
  image?: string;
}

interface Signal {
  date: string;
  content: string;
  type: string;
}

interface EcosystemData {
  howWeThink: ContentItem[];
  whatWeExplore: ContentItem[];
  howPeopleEngage: ContentItem[];
  theNetwork: NetworkMember[];
  ongoingSignals: Signal[];
}

// --- Mock Data (Fallback) ---
const MOCK_DATA: EcosystemData = {
  howWeThink: [
    { title: "跨學科透鏡", description: "打破學科邊界，從物理、生物與社會科學中提取心智模型。" },
    { title: "不確定性管理", description: "在資訊不全的情況下，如何建立穩健的決策框架。" },
    { title: "視角轉換", description: "練習從不同維度觀察同一問題，發現隱藏的結構。" }
  ],
  whatWeExplore: [
    { title: "AI 與人類判斷", description: "當演算法介入決策，人類的直覺與判斷力該如何演進？" },
    { title: "地緣政治動態", description: "理解全球權力結構的變遷及其對在地決策的影響。" },
    { title: "行星健康", description: "探討人類系統與地球生態系統的共生關係。" }
  ],
  howPeopleEngage: [
    { title: "學習旅程", description: "長期的、非線性的思維探索過程。" },
    { title: "對話沙龍", description: "深度的、同儕間的智慧碰撞。" },
    { title: "研究協作", description: "將理論應用於真實世界的高風險挑戰。" }
  ],
  theNetwork: [
    { 
      name: "李明", 
      role: "實踐者", 
      title: "複雜系統研究員",
      bio: "專注於複雜系統中的決策優化，致力於將混沌理論應用於社會組織結構。",
      image: "https://picsum.photos/seed/li/400/500"
    },
    { 
      name: "張華", 
      role: "導師", 
      title: "前戰略顧問",
      bio: "擁有三十年跨國企業戰略規劃經驗，擅長引導高階主管在極端不確定性下的思維轉型。",
      image: "https://picsum.photos/seed/zhang/400/500"
    },
    { 
      name: "陳思", 
      role: "協作者", 
      title: "跨領域設計師",
      bio: "探索設計思維與哲學的交集，為生態系統提供視覺化與感官化的思考工具。",
      image: "https://picsum.photos/seed/chen/400/500"
    }
  ],
  ongoingSignals: [
    { date: "2024.03.20", content: "關於「演算法透明度」的深度討論正在進行中。", type: "討論" },
    { date: "2024.03.15", content: "新的研究路徑：生物多樣性與金融韌性的關聯。", type: "研究" }
  ]
};

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: '首頁' },
    { id: 'think', label: '思維方式' },
    { id: 'explore', label: '探索領域' },
    { id: 'engage', label: '參與路徑' },
    { id: 'network', label: '網絡連結' },
    { id: 'signals', label: '持續訊號' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-brick font-serif text-2xl tracking-tighter cursor-pointer"
          onClick={() => setActiveSection('home')}
        >
          EVOLVING INTELLIGENCE
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors hover:text-brick",
                activeSection === item.id ? "text-brick font-semibold" : "text-zinc-700"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-zinc-100 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left text-lg font-serif",
                    activeSection === item.id ? "text-brick" : "text-zinc-800"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <h2 className="text-5xl md:text-7xl font-serif text-brick mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-xl text-zinc-700 max-w-2xl font-normal leading-relaxed">{subtitle}</p>}
  </div>
);

const Card = ({ title, description, index }: { title: string, description: string, index: number, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group p-8 border border-zinc-200 hover:border-brick/20 transition-all duration-500 bg-white"
  >
    <div className="text-xs text-zinc-500 mb-6 font-mono">0{index + 1}</div>
    <h3 className="text-2xl font-serif mb-4 group-hover:text-brick transition-colors">{title}</h3>
    <p className="text-zinc-800 leading-relaxed font-normal">{description}</p>
    <div className="mt-8 flex items-center text-brick opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-xs uppercase tracking-widest mr-2">深入探索</span>
      <ArrowRight size={14} />
    </div>
  </motion.div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [data, setData] = useState<EcosystemData>(MOCK_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const json = await res.json();
          // Only update if we actually got data back (not empty arrays from unconfigured sheet)
          if (json.howWeThink && json.howWeThink.length > 0) {
            setData(json);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data, using mock data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brick/10 selection:text-brick">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[70vh] flex flex-col justify-center"
            >
              <div className="max-w-4xl">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs uppercase tracking-[0.3em] text-brick mb-8 font-semibold"
                >
                  Education–Practice Ecosystem
                </motion.div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.2] mb-12"
                >
                  高度不確定中，<br />
                  連接未知疆域的入口。
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-zinc-700 font-normal leading-relaxed max-w-3xl mb-16"
                >
                  一個持續動態演化的思想樞紐，匯聚高潛力學生、全球學者與資深實務者，在不確定的張力中共同探索與前行。
                </motion.p>
                
                <div className="grid grid-cols-1 gap-12 border-t border-zinc-200 pt-12">
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl">核心理念</h4>
                    <p className="text-zinc-700 font-normal leading-relaxed max-w-4xl">
                      跨越大學、學科與國界，將教育、對話與實務實踐融為一體，透過「創業家思維」及「多面向思維」，提升思考、判斷及決策維度，引導未來領導者在AI與地緣政治劇變的時代，面對複雜性與不確定性的思維與決策能力。
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'think' && (
            <motion.section
              key="think"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionHeading 
                title="思維方式" 
                subtitle="我們如何接近複雜性？透過框架、透鏡與心智模型的建立，重新定義觀察世界的方式。"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.howWeThink.map((item, i) => (
                  <Card key={i} index={i} title={item.title} description={item.description} />
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'explore' && (
            <motion.section
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionHeading 
                title="探索領域" 
                subtitle="將不確定性、決策、AI、地緣政治與行星健康視為不斷演進的提問，而非靜態的知識主題。"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.whatWeExplore.map((item, i) => (
                  <Card key={i} index={i} title={item.title} description={item.description} />
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'engage' && (
            <motion.section
              key="engage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionHeading 
                title="參與路徑" 
                subtitle="沒有僵化的標籤，只有不斷演進的旅程。無論是學習、對話或協作，重點在於長期的投入。"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.howPeopleEngage.map((item, i) => (
                  <Card key={i} index={i} title={item.title} description={item.description} />
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'network' && (
            <motion.section
              key="network"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionHeading 
                title="網絡連結" 
                subtitle="人是動態的角色，而非靜態的職稱。這是一個由實踐者、創辦者與思想家組成的共生網絡。"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {data.theNetwork.map((member, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="aspect-[3/4] overflow-hidden mb-6 bg-zinc-100">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                          <Users size={48} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-serif">{member.name}</h3>
                        <span className="text-[10px] uppercase tracking-widest text-brick font-bold">{member.role}</span>
                      </div>
                      <div className="text-sm font-serif italic text-zinc-500">{member.title}</div>
                      <p className="text-zinc-700 font-normal leading-relaxed text-sm pt-4 border-t border-zinc-100">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'signals' && (
            <motion.section
              key="signals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionHeading 
                title="持續訊號" 
                subtitle="當前正在被討論、質疑或檢視的議題。這不是新聞更新，而是思想演進的軌跡。"
              />
              <div className="space-y-8">
                {data.ongoingSignals.map((signal, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-zinc-50 border-l-4 border-brick">
                    <div className="font-mono text-sm text-zinc-500 shrink-0">{signal.date}</div>
                    <div className="text-lg font-normal leading-relaxed flex-grow text-zinc-800">{signal.content}</div>
                    <div className="text-xs uppercase tracking-widest px-3 py-1 bg-white border border-zinc-200 rounded-full shrink-0 text-center font-semibold">
                      {signal.type}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-40 border-t border-zinc-200 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-2xl">
            <p className="text-brick font-medium text-sm tracking-wider mb-4">
              A SANDBOX FOR MULTI-FACETED LEARNING AND UNDERSTANDING UNDER HIGH UNCERTAINTY
            </p>
            <p className="text-brick font-normal text-sm leading-relaxed">
              邀請你在此停留、思考，並與他人共同持續探索未知的邊界。
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm text-zinc-800">
            <a href="#" className="hover:text-brick transition-colors">聯絡我們</a>
            <a href="#" className="hover:text-brick transition-colors">加入我們</a>
            <a href="#" className="hover:text-brick transition-colors">隱私與倫理</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 text-[10px] uppercase tracking-[0.4em] text-zinc-400">
          © 2026 度化智能 Evolving Intelligence
        </div>
      </footer>
    </div>
  );
}
