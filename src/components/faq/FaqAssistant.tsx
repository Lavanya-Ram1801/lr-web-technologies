import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, User } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { FAQS, SUGGESTED_QUESTIONS } from "../../data/faq";
import { SITE } from "../../data/site";
import { waGeneral, waLink } from "../../lib/whatsapp";

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
  /** Show contact actions under this bot message */
  help?: boolean;
}

const STOP = new Set(["the", "a", "an", "is", "are", "do", "you", "your", "i", "to", "of", "and", "for", "can", "how", "what", "my", "me", "it", "in", "on", "we", "or"]);

function findAnswer(input: string): { text: string; matched: boolean } {
  const text = input.toLowerCase();
  const words = text.split(/[^a-z0-9₹-]+/).filter((w) => w.length > 1 && !STOP.has(w));
  let best: { score: number; idx: number } = { score: 0, idx: -1 };
  FAQS.forEach((f, idx) => {
    let score = 0;
    if (f.q.toLowerCase() === text.trim()) score += 100;
    f.keywords.forEach((k) => {
      if (text.includes(k)) score += k.includes(" ") ? 3 : 2;
    });
    words.forEach((w) => {
      if (f.q.toLowerCase().includes(w)) score += 1;
    });
    if (score > best.score) best = { score, idx };
  });
  if (best.idx >= 0 && best.score >= 2) return { text: FAQS[best.idx].a, matched: true };
  return {
    text: "I could not find a matching answer in my list of frequently asked questions. For anything else, please contact the L&R Web Technologies team directly.",
    matched: false,
  };
}

/** Rule-based FAQ assistant. It uses predefined answers (no paid AI API) and says clearly that it is automated. */
export default function FaqAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "bot",
      text: "Hello! I am the automated FAQ assistant for L&R Web Technologies. I am not a human, but I can answer common questions about our services, pricing, process, payments, revisions, timelines, hosting, maintenance and contact details. Pick a question below or type your own.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    const userMsg: Msg = { id: idRef.current++, from: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    timer.current = window.setTimeout(() => {
      const { text, matched } = findAnswer(q);
      setMessages((m) => [...m, { id: idRef.current++, from: "bot", text, help: !matched }]);
      setTyping(false);
    }, 450);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="card flex h-[620px] max-h-[85vh] flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] px-5 py-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-base font-bold">FAQ Assistant</p>
          <p className="text-xs text-white/80">Automated answers · not a human representative</p>
        </div>
      </div>

      <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-5" role="log" aria-live="polite" aria-label="FAQ conversation">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                m.from === "user" ? "bg-brand text-white" : "bg-brand/15 text-brand"
              }`}
              aria-hidden="true"
            >
              {m.from === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`max-w-[85%] ${m.from === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block whitespace-pre-line rounded-2xl px-4 py-3 text-left text-sm leading-relaxed ${
                  m.from === "user" ? "bg-brand text-white" : "bg-muted text-ink"
                }`}
              >
                {m.text}
              </div>
              {m.help && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button to="/contact" size="sm">
                    Contact Our Business
                  </Button>
                  <Button href={waLink(waGeneral)} size="sm" variant="whatsapp" icon={<WhatsAppIcon className="h-4 w-4" />}>
                    WhatsApp
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3" aria-label="Assistant is typing">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-soft" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-line p-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1" aria-label="Suggested questions">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              disabled={typing}
              className="shrink-0 rounded-full border border-brand/40 px-3 py-1.5 text-xs font-medium text-brand transition hover:bg-brand/10 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <label htmlFor="faq-input" className="sr-only">
            Type your question
          </label>
          <input
            id="faq-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="field"
            maxLength={200}
            autoComplete="off"
          />
          <button
            type="submit"
            aria-label="Send question"
            disabled={!input.trim() || typing}
            className="flex w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] text-white transition hover:brightness-110 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-soft">
          Need more help? Email{" "}
          <a className="font-medium text-brand underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
      </div>
    </div>
  );
}
