import { Star } from "lucide-react";
import { useState } from "react";
import { Button, Chip } from "../components/UI";
import { ScreenId } from "../types";

const POSITIVES = ["Easy to find", "Fast charging", "Friendly host", "Clean", "Good signage"];
const NEGATIVES = ["Hard to access", "Bad signage", "Slow speed", "Unclear pricing"];

export function F45_Rating({ go }: { go: (s: ScreenId) => void }) {
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  const tagSet = stars > 3 ? POSITIVES : stars > 0 ? NEGATIVES : [];

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <div className="flex-1 px-gutter pt-12 pb-6 flex flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-neon/30 to-accent-cyan/30 flex items-center justify-center text-2xl font-bold">
            B
          </div>
          <div className="text-bodysm mt-2">Boon</div>
          <div className="text-t1 mt-4">How was your charge?</div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)}>
              <Star
                size={42}
                className={n <= stars ? "text-accent-neon" : "text-ink-disabled"}
                fill={n <= stars ? "#00E676" : "transparent"}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>

        {tagSet.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {tagSet.map((tag) => (
              <Chip
                key={tag}
                active={tags.includes(tag)}
                onClick={() =>
                  setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]))
                }
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}

        {stars > 0 && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us more (optional)"
            maxLength={280}
            rows={3}
            className="mt-6 bg-bg-surface border border-border-subtle rounded-card p-3 text-bodysm placeholder:text-ink-disabled outline-none focus:border-accent-neon resize-none"
          />
        )}

        <div className="mt-auto pt-6 space-y-2">
          <Button onClick={() => go("F2.1")} disabled={stars === 0}>
            Submit rating
          </Button>
          <button onClick={() => go("F2.1")} className="w-full text-bodysm text-ink-secondary py-2">
            Skip and submit
          </button>
        </div>
      </div>
    </div>
  );
}
