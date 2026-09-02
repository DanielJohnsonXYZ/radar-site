"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const models = ["Retainer", "Recurring managed service", "Multi-month project", "Fractional team"];
const sizes = ["1-4", "5-15", "16-30", "30+"];

type Status = "idle" | "submitting" | "success" | "error";

export function PilotForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const authority = data.get("authority");
    if (!authority) {
      setStatus("error");
      setMessage("Please tick the box to confirm you can connect your team’s tools.");
      return;
    }
    if (data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          model: data.get("model"),
          relationships: data.get("relationships"),
          catchFirst: data.get("catchFirst"),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Email daniel@wescalestartups.com and we will pick it up.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">We got it</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">Thanks — we’ll be in touch.</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          Daniel reads every application. If Radar looks like a fit, you’ll hear back with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" required placeholder="Your name" className="h-10 bg-white" />
        </Field>
        <Field label="Work email" htmlFor="email">
          <Input id="email" name="email" type="email" required placeholder="you@agency.com" className="h-10 bg-white" />
        </Field>
      </div>
      <Field label="How do you usually work with clients?" htmlFor="model">
        <select
          id="model"
          name="model"
          required
          defaultValue=""
          className="h-10 w-full rounded-lg border border-input bg-white px-3 text-sm"
        >
          <option value="" disabled>
            Choose one
          </option>
          {models.map((model) => (
            <option key={model}>{model}</option>
          ))}
        </select>
      </Field>
      <Field label="How many clients do you look after?" htmlFor="relationships">
        <select
          id="relationships"
          name="relationships"
          required
          defaultValue=""
          className="h-10 w-full rounded-lg border border-input bg-white px-3 text-sm"
        >
          <option value="" disabled>
            Choose one
          </option>
          {sizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </Field>
      <Field label="What should Radar watch for first?" htmlFor="catchFirst" optional>
        <Textarea
          id="catchFirst"
          name="catchFirst"
          placeholder="Clients going quiet, extra work we might miss, things we promised…"
          className="min-h-24 bg-white"
        />
      </Field>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
        <input type="checkbox" name="authority" required className="mt-1 size-4 accent-[#1262ff]" />
        <span>
          I can connect our team’s email and meeting tools.
        </span>
      </label>
      {status === "error" ? <p className="text-[13px] text-risk">{message}</p> : null}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-11 rounded-full bg-brand text-white hover:bg-brand-deep"
      >
        {status === "submitting" ? "Sending…" : "Ask to join the pilot"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor} className="text-[13px] text-ink">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-faint">Optional</span> : null}
      </Label>
      {children}
    </div>
  );
}
