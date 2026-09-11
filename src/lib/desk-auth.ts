import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { HOUSE } from "@/data/house";

const COOKIE = "pinks_session";
const DAY = 60 * 60 * 24;

export type DeskUser = { email: string; name: string };

export type DeskTicket = {
  id: number;
  week: string;
  title: string;
  legs: { pick: string; line: string; ml: number }[];
  stake: number | null;
  book: string;
  result: string;
  created_at: string;
};

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function passwordOk(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  return prev.length === next.length && timingSafeEqual(prev, next);
}

async function readEmail() {
  const token = getCookie(COOKIE);
  if (!token) return null;
  const sql = await getSql();
  const rows = await sql<{ email: string }>`
    select email from desk_sessions
    where token = ${token} and expires_at > now()
    limit 1
  `;
  return rows[0]?.email ?? null;
}

async function writeSession(email: string) {
  const token = randomBytes(24).toString("hex");
  const sql = await getSql();
  await sql`
    insert into desk_sessions (token, email, expires_at)
    values (${token}, ${email}, now() + interval '60 days')
  `;
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * DAY,
  });
}

export const deskMe = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const email = await readEmail();
    if (!email) return { ok: true as const, user: null };
    const sql = await getSql();
    const rows = await sql<{ email: string; name: string }>`
      select email, name from members where email = ${email} limit 1
    `;
    const row = rows[0];
    return { ok: true as const, user: row ? { email: row.email, name: row.name } : null };
  } catch {
    return { ok: true as const, user: null };
  }
});

export const deskLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return {
      email: String(rec.email ?? "").trim().toLowerCase().slice(0, 120),
      password: String(rec.password ?? ""),
    };
  })
  .handler(async ({ data }) => {
    if (!data.email.includes("@") || data.password.length < 8) {
      return { ok: false as const, error: "Email and a password of 8+ characters." };
    }
    try {
      const sql = await getSql();
      const rows = await sql<{ email: string; name: string; password_hash: string }>`
        select email, name, password_hash from members where email = ${data.email} limit 1
      `;
      const row = rows[0];
      if (!row) {
        return { ok: false as const, error: "Join first. The list has to know you." };
      }
      if (!row.password_hash) {
        await sql`update members set password_hash = ${hashPassword(data.password)} where email = ${data.email}`;
      } else if (!passwordOk(data.password, row.password_hash)) {
        return { ok: false as const, error: "Wrong password." };
      }
      await writeSession(data.email);
      return { ok: true as const, user: { email: row.email, name: row.name }, first: !row.password_hash };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "login failed";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });

export const deskLogout = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const token = getCookie(COOKIE);
    if (token) {
      const sql = await getSql();
      await sql`delete from desk_sessions where token = ${token}`;
    }
  } catch {
    /* */
  }
  try {
    deleteCookie(COOKIE);
  } catch {
    setCookie(COOKIE, "", { path: "/", maxAge: 0 });
  }
  return { ok: true as const };
});

export const saveDeskTicket = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    const rawLegs = Array.isArray(rec.legs) ? rec.legs : [];
    return {
      title: String(rec.title ?? "Pink ticket").slice(0, 80),
      book: String(rec.book ?? "").slice(0, 40),
      stake: Number(rec.stake) || 0,
      legs: rawLegs.slice(0, 8).map((leg) => {
        const row = leg && typeof leg === "object" ? (leg as Record<string, unknown>) : {};
        return {
          pick: String(row.pick ?? "").slice(0, 40),
          line: String(row.line ?? "").slice(0, 80),
          ml: Number(row.ml) || 0,
        };
      }),
    };
  })
  .handler(async ({ data }) => {
    const email = await readEmail();
    if (!email) return { ok: false as const, error: "Sign in to save history." };
    if (!data.legs.length) return { ok: false as const, error: "No legs." };
    try {
      const sql = await getSql();
      const rows = await sql<{ id: number }>`
        insert into tickets (member_email, week, title, legs, stake, book, result)
        values (
          ${email},
          ${HOUSE.week},
          ${data.title},
          ${JSON.stringify(data.legs)}::jsonb,
          ${data.stake},
          ${data.book},
          ${"open"}
        )
        returning id
      `;
      return { ok: true as const, id: rows[0]?.id ?? 0 };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "save failed";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });

export const listDeskTickets = createServerFn({ method: "GET" }).handler(async () => {
  const email = await readEmail();
  if (!email) return { ok: false as const, error: "Sign in." };
  try {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      week: string;
      title: string;
      legs: DeskTicket["legs"] | string;
      stake: string | number | null;
      book: string;
      result: string;
      created_at: string;
    }>`
      select id, week, title, legs, stake, book, result, created_at::text as created_at
      from tickets
      where member_email = ${email}
      order by created_at desc
      limit 200
    `;
    const tickets: DeskTicket[] = rows.map((r) => ({
      id: r.id,
      week: r.week,
      title: r.title,
      legs: typeof r.legs === "string" ? (JSON.parse(r.legs) as DeskTicket["legs"]) : r.legs,
      stake: r.stake == null ? null : Number(r.stake),
      book: r.book,
      result: r.result,
      created_at: r.created_at,
    }));
    return { ok: true as const, tickets };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "list failed";
    return { ok: false as const, error: msg.slice(0, 180) };
  }
});

export const gradeDeskTicket = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    const result = String(rec.result ?? "");
    return {
      id: Number(rec.id) || 0,
      result: result === "win" || result === "lose" || result === "push" || result === "open" ? result : "open",
    };
  })
  .handler(async ({ data }) => {
    const email = await readEmail();
    if (!email) return { ok: false as const, error: "Sign in." };
    try {
      const sql = await getSql();
      await sql`
        update tickets set result = ${data.result}
        where id = ${data.id} and member_email = ${email}
      `;
      return { ok: true as const };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "grade failed";
      return { ok: false as const, error: msg.slice(0, 180) };
    }
  });
