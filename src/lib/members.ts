import { createServerFn } from "@tanstack/react-start";
import { dbSource, getSql } from "@/lib/db";
import { houseOk } from "@/lib/house.server";

export type MemberRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  channel: string;
  version: string;
  mailer: string;
  created_at: string;
};

const CHANNELS = ["email", "sms", "both", "app"] as const;

function isChannel(v: unknown): v is (typeof CHANNELS)[number] {
  return typeof v === "string" && (CHANNELS as readonly string[]).includes(v);
}

export const addMember = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return {
      name: String(rec.name ?? "").trim().slice(0, 80),
      email: String(rec.email ?? "").trim().toLowerCase().slice(0, 120),
      phone: String(rec.phone ?? "").trim().slice(0, 32),
      channel: isChannel(rec.channel) ? rec.channel : "email",
      version: String(rec.version ?? "").slice(0, 40),
    };
  })
  .handler(async ({ data }) => {
    if (!data.email.includes("@") || !data.name) {
      return { ok: false as const, error: "Name and email." };
    }
    try {
      const sql = await getSql();
      await sql`
        insert into members (name, email, phone, channel, version, mailer)
        values (${data.name}, ${data.email}, ${data.phone}, ${data.channel}, ${data.version}, ${"dark"})
        on conflict (email) do update set
          name = excluded.name,
          phone = excluded.phone,
          channel = excluded.channel,
          version = excluded.version
      `;
      return { ok: true as const, source: dbSource };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "desk list failed";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });

export const listMembers = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as { code?: unknown }) : {};
    return { code: String(rec.code ?? "") };
  })
  .handler(async ({ data }) => {
    if (!houseOk(data.code)) {
      return { ok: false as const, error: "Wrong door." };
    }
    try {
      const sql = await getSql();
      const rows = await sql<MemberRow>`
        select id, name, email, phone, channel, version, mailer, created_at::text as created_at
        from members
        order by created_at desc
        limit 500
      `;
      return { ok: true as const, rows };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "list failed";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });

export const memberCount = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`select count(*)::int as n from members`;
    return { ok: true as const, n: rows[0]?.n ?? 0 };
  } catch {
    return { ok: true as const, n: 0 };
  }
});
