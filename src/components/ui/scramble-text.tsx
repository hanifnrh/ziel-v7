"use client";
import { useCallback, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.!?@#$%^&*()_+-=<>{}[]|/\\";

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<number | null>(null);

    const scramble = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }

        let iteration = 0;
        intervalRef.current = window.setInterval(() => {
            const next = text
                .split("")
                .map((ch, i) =>
                    i < iteration
                        ? ch
                        : CHARS[Math.floor(Math.random() * CHARS.length)],
                )
                .join("");
            el.innerText = next;

            if (iteration >= text.length) {
                if (intervalRef.current !== null) clearInterval(intervalRef.current);
                intervalRef.current = null;
                el.innerText = text;
            }
            iteration += 1 / 3;
        }, 30);
    }, [text]);

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span ref={ref} onMouseOver={scramble} className={className}>
            {text}
        </span>
    );
}