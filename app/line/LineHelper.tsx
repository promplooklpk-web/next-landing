"use client";

import { useCallback, useState } from "react";
import { shop } from "@/data/shop";
import { AppLink } from "../components/AppLink";
import { Logo } from "../components/Logo";

const steps = [
  "กดปุ่มเปิด Line",
  "เลือกค้นหา → หมายเลขโทรศัพท์",
  `วางเบอร์ ${shop.phoneTel} แล้วเพิ่มเพื่อน`,
] as const;

export function LineHelper() {
  const [copied, setCopied] = useState(false);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shop.phoneTel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("textarea");
      input.value = shop.phoneTel;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const btnBase =
    "inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-md px-6 py-3 text-[14px] font-medium tracking-wide transition-all duration-300";

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/92 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          <Logo size={28} className="shrink-0 text-accent" />
          <span className="truncate text-sm font-medium">{shop.name}</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-6 py-10 pb-16">
        <AppLink
          href="/"
          className="text-xs text-muted transition hover:text-accent"
        >
          ← กลับหน้าแรก
        </AppLink>

        <h1 className="mt-8 text-2xl font-medium tracking-tight md:text-3xl">
          เพิ่มเพื่อน Line ด้วยเบอร์
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Line ไม่รองรับลิงก์เพิ่มเพื่อนอัตโนมัติด้วยเบอร์โทร — ใช้เบอร์ด้านล่างค้นหาในแอป
          Line ได้เลย
        </p>

        <div className="mt-10 rounded-xl border border-border bg-surface-raised px-6 py-8 text-center">
          <p className="text-xs font-medium tracking-wide text-accent">
            เบอร์โทรศัพท์
          </p>
          <p
            className="mt-3 text-4xl font-medium tracking-tight text-foreground tabular-nums md:text-5xl"
            aria-label={`เบอร์ ${shop.phone}`}
          >
            {shop.phone}
          </p>
          <button
            type="button"
            onClick={copyPhone}
            className={`${btnBase} mt-6 border border-border-dark bg-surface text-foreground hover:border-accent/50 hover:bg-surface-raised active:bg-background`}
          >
            {copied ? "คัดลอกแล้ว" : "คัดลอกเบอร์"}
          </button>
        </div>

        <a
          href={shop.lineAddFriendsUrl}
          className={`${btnBase} mt-4 bg-accent text-accent-foreground shadow-lg shadow-black/30 hover:bg-accent-hover active:brightness-95`}
        >
          เปิด Line เพื่อเพิ่มเพื่อน
        </a>

        <ol className="mt-10 space-y-4 rounded-xl border border-border bg-surface/60 px-5 py-6 text-left text-sm leading-relaxed text-foreground/90">
          {steps.map((text, index) => (
            <li key={text} className="flex gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-medium text-accent"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="pt-0.5">{text}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-xs text-muted">
          โทรหาเราได้ที่{" "}
          <a
            href={`tel:${shop.phoneTel}`}
            className="text-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            {shop.phone}
          </a>
        </p>
      </main>
    </div>
  );
}
