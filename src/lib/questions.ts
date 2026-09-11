import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

export const askQuestion = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return {
      name: String(rec.name ?? "").trim().slice(0, 80),
      email: String(rec.email ?? "").trim().toLowerCase().slice(0, 120),
      body: String(rec.body ?? "").trim().slice(0, 800),
    };
  })
  .handler(async ({ data }) => {
    if (!data.email.includes("@") || data.body.length < 8) {
      return { ok: false as const, error: "Email and a real question." };
    }
    try {
      const sql = await getSql();
      await sql`
        insert into questions (name, email, body)
        values (${data.name}, ${data.email}, ${data.body})
      `;
      return { ok: true as const };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "could not save";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });
