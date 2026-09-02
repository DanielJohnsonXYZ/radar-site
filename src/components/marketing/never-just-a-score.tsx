import { Container } from "@/components/marketing/primitives";

const flow = [
  {
    step: "1",
    title: "Connect Gmail, Slack and Zoom",
    body: "Plus Outlook and Google Meet if you use those. Radar only reads — it never sends messages.",
  },
  {
    step: "2",
    title: "It spots what changed",
    body: "Someone went quiet. A client asked for more work. A promise slipped.",
  },
  {
    step: "3",
    title: "It shows you the proof",
    body: "Every alert links back to the email, call or Slack message. No mystery score.",
  },
  {
    step: "4",
    title: "You decide what to do",
    body: "Radar suggests the next step and can draft a message. You stay in charge.",
  },
];

export function NeverJustAScore() {
  return (
    <section className="navy-mesh relative overflow-hidden text-white">
      <div className="radar-rings pointer-events-none absolute inset-0 [--rings-x:88%] [--rings-y:20%]" />
      <Container className="relative py-16">
        <p className="text-[13px] font-medium text-white/55">How it works</p>
        <h2 className="mt-2 max-w-2xl font-heading text-[32px] leading-[1.12] tracking-tight sm:text-[40px]">
          Connect your tools. Radar watches. You get a short list each morning.
        </h2>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((item) => (
            <li key={item.step} className="rounded-2xl border border-white/10 bg-white/6 p-5">
              <p className="text-[12px] font-semibold text-blue-300">{item.step}</p>
              <p className="mt-2 text-[18px] font-semibold">{item.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
