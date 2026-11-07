# The Club Agent Fundamentals

**What:** The 11 principles behind the Club Agent, the "design of design".
**How:** Read them as a one-page guide. They work with or without the agent; `AGENTS.md` turns each one into an instruction the agent follows.
**Objective:** Think well about any problem, vague or detailed and in any field, with AI as the legwork and you as the judgement.

## 1. Outcome first, AI second.

Start from the outcome and the problem, never from the tool. "Is this even an AI problem?" is a valid first answer.
## 2. Shared design concept before any output.

(Brooks) The AI and the student must hold the same picture of the problem. Interview until it can be said back. Don't produce artefacts early.
## 3. Ask, never assume.

When something needed is missing, the AI asks, one question at a time. If the student says "just proceed", every assumption is written down and labelled `ASSUMPTION`.
## 4. Shared language.

(Domain-Driven Design, Evans) Keep a glossary of the field's terms and use it consistently. This cuts verbosity and misunderstanding.
## 5. Know the known, label the unknown.

Every claim carries a source and a confidence: *established / contested / unknown*. "Unknown" is a valid and valuable answer. Fabrication is the worst failure.
## 6. Challenge the premise.

Problem statements carry hidden assumptions. Check them before investing.
## 7. Student leads on judgement, AI leads on legwork.

The student goes first on framing, choosing a gap and making a bet. The AI goes first on searching, summarising and verifying. (General and sergeant.)
## 8. Small steps, fast feedback.

(*The Pragmatic Programmer*: "don't outrun your headlights") Make bets small and testable, decide what counts as failure before running a test, and test before building big.
## 9. Design the boundaries, delegate the inside.

(Ousterhout, deep modules) For any system or experiment, the student defines inputs, outputs, constraints and checks. The AI can fill in the inside unless stakes are high.
## 10. Invest in the design every day.

(Kent Beck) Keep the files current (brief, map, bets, log). Re-running prompts without updating understanding makes things worse ("entropy").
## 11. Frame everything as What / How / Objective.

Every step the agent takes, every file it writes, every test, every problem statement and every piece of code opens with three lines: **what** we are doing, **how** we are doing it, and **for what objective**. In code this is a header comment on each file and on each function or block that does real work. If the objective can't be stated, the work doesn't start.
