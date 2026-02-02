"use client";

import { useMemo, useState } from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const disabled = useMemo(() => status === "loading", [status]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the waitlist — we’ll email you when early access opens.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <main>
      <header className="container">
        <nav className="nav">
          <div className="logo" aria-label="EvidentAI">
            <span className="logo-mark" aria-hidden="true" />
            <span>EvidentAI</span>
          </div>
          <div className="nav-links">
            <a href="#how" onClick={(e) => (e.preventDefault(), scrollToId("how"))}>How it works</a>
            <a href="#faq" onClick={(e) => (e.preventDefault(), scrollToId("faq"))}>FAQ</a>
            <button className="btn btnSecondary" onClick={() => scrollToId("waitlist")}>
              Join waitlist
            </button>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container grid">
          <div>
            <span className="pill"><span className="badge" /> Launching soon</span>
            <h1 className="h1">Peace of mind.<br />With science.</h1>
            <p className="sub">
              EvidentAI is building an understandable, AI-based second opinion after mammography—
              designed for women who want extra reassurance and clarity.
            </p>

            <div className="ctaRow" id="waitlist">
              <form onSubmit={submit} style={{ width: "100%" }}>
                <div className="formRow">
                  <input
                    className="input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button className="btn" type="submit" disabled={disabled}>
                    {status === "loading" ? "Adding…" : "Join the waitlist"}
                  </button>
                </div>
                <div className="smallNote" style={{ marginTop: 10 }}>
                  {status === "success" && <span className="success">{message}</span>}
                  {status === "error" && <span className="error">{message}</span>}
                  {status === "idle" && (
                    <span>
                      No spam. Early access invites + product updates only.
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="ctaRow" style={{ marginTop: 16 }}>
              <button className="btn btnSecondary" onClick={() => scrollToId("how")}>See how it works</button>
              <span className="smallNote">
                Not medical advice. Does not replace radiologists.
              </span>
            </div>
          </div>

          <aside className="card" aria-label="Why now">
            <h3>Why women want a second look</h3>
            <div className="stat">
              <b>1 in 8</b>
              <span>
                malignant breast cancer findings may be missed by screening.
              </span>
            </div>
            <div className="stat">
              <b>Clarity</b>
              <span>
                An understandable report in plain language — built to reduce uncertainty.
              </span>
            </div>
            <div className="stat">
              <b>Escalation</b>
              <span>
                If anything looks suspicious, we can offer a radiologist consultation.
              </span>
            </div>
            <p className="smallNote" style={{ marginTop: 10 }}>
              These points are based on the concept deck; wording and numbers will be refined as we publish clinical details.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 id="how">How it works</h2>
          <p>
            A simple, privacy-first flow: you provide your mammography images (or authorize transfer), our AI evaluates them,
            and you receive a clear explanation. If the model flags anything concerning, you can choose an expert review.
          </p>

          <div className="features" style={{ marginTop: 14 }}>
            <div className="feature">
              <h3>1) Upload / authorize</h3>
              <p>Provide your images in a secure way (details at launch).</p>
            </div>
            <div className="feature">
              <h3>2) AI assessment</h3>
              <p>Our models focus on spotting subtle signals that can be hard to see.</p>
            </div>
            <div className="feature">
              <h3>3) Human-friendly report</h3>
              <p>Most cases: reassurance with an explanation. Rare cases: offer a radiologist consult.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Built for reassurance, not replacement</h2>
          <p>
            EvidentAI is not here to “compete with radiologists.” We’re building a women-facing service that helps you feel confident
            you did everything you reasonably could—using science as a safety net.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 id="faq">FAQ</h2>
          <div className="faq">
            <details>
              <summary>Is this a diagnosis?</summary>
              <p>No. It’s a supplementary opinion and explanation. Any medical decisions must be made with qualified clinicians.</p>
            </details>
            <details>
              <summary>Do you replace my radiologist?</summary>
              <p>No. We’re building an extra layer of reassurance and clarity for patients, with an option to consult a radiologist if needed.</p>
            </details>
            <details>
              <summary>What happens if something looks suspicious?</summary>
              <p>We will guide you to a next step, which may include an expert consultation, depending on what is available in your region.</p>
            </details>
            <details>
              <summary>When will it be available?</summary>
              <p>We’re preparing an early access rollout. Join the waitlist and we’ll email you when invitations open.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="container footer">
        <div>
          <b>EvidentAI</b> <span className="smallNote">© {new Date().getFullYear()}</span>
        </div>
        <div className="smallNote">
          Deploy tip: set <span className="kbd">WAITLIST_WEBHOOK_URL</span> in Vercel to capture emails.
        </div>
      </footer>
    </main>
  );
}
