import { readdir, readFile } from "fs/promises";
import path from "path";

// themain.quest mails its life-context brief to this repository through the
// repos.chat mailbox (`npm run life:context -- --send` over there). Messages
// are plain JSON files under <workspace>/.repo-connect/mail/summon.guide/, so
// reading them needs no server, token, or network. On Vercel the directory
// does not exist and every reader returns null; production keeps using the
// paste-a-brief path instead.

export const LIFE_CONTEXT_SENDER = "themain.quest";
export const LIFE_CONTEXT_SUBJECT = "life-context";
export const LIFE_CONTEXT_HEADING = "# Personal context";
const REPO_ID = "summon.guide";

export type LifeContextNotice = {
  id: string;
  from: string;
  markdown: string;
  createdAt: string;
  acknowledgedAt?: string;
};

type MailMessage = {
  version?: number;
  id?: string;
  from?: string;
  to?: string;
  kind?: string;
  subject?: string;
  body?: string;
  createdAt?: string;
  acknowledgedAt?: string;
};

export function isLifeContextBrief(text: string): boolean {
  return /^#\s*Personal context\b/m.test(text);
}

export function resolveWorkspaceRoot(): string {
  const configured = process.env.REPOS_CHAT_ROOT?.trim();
  return configured ? path.resolve(configured) : path.resolve(process.cwd(), "..");
}

export function lifeContextMailbox(root = resolveWorkspaceRoot()): string {
  return path.join(root, ".repo-connect", "mail", REPO_ID);
}

function isLifeContextMessage(message: MailMessage): message is Required<Pick<MailMessage, "id" | "from" | "body" | "createdAt">> & MailMessage {
  return (
    message.kind === "notice" &&
    message.subject === LIFE_CONTEXT_SUBJECT &&
    message.from === LIFE_CONTEXT_SENDER &&
    typeof message.id === "string" &&
    typeof message.body === "string" &&
    typeof message.createdAt === "string" &&
    isLifeContextBrief(message.body)
  );
}

/** The newest life-context notice, acknowledged or not. Null when none exists. */
export async function readLifeContextNotice(root?: string): Promise<LifeContextNotice | null> {
  const dir = lifeContextMailbox(root);
  let names: string[] = [];
  try {
    names = (await readdir(dir)).filter((name) => name.endsWith(".json"));
  } catch {
    return null;
  }

  let newest: LifeContextNotice | null = null;
  for (const name of names) {
    try {
      const message = JSON.parse(await readFile(path.join(dir, name), "utf8")) as MailMessage;
      if (!isLifeContextMessage(message)) continue;
      if (!newest || message.createdAt > newest.createdAt) {
        newest = {
          id: message.id,
          from: message.from,
          markdown: message.body,
          createdAt: message.createdAt,
          acknowledgedAt: message.acknowledgedAt,
        };
      }
    } catch {
      // A corrupt message must not hide the readable ones.
    }
  }
  return newest;
}
