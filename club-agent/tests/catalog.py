# What: The canonical list of the 21 default Club Agent skills and where each comes from.
# How: Plain Python constants imported by the tests.
# Objective: Keep the core small and fixed (spec §11, §13); any drift fails a test.
EXPECTED_SKILLS = [
    "triage", "domain-pack", "where-am-i", "grilling", "frame-question",
    "field-map", "glossary", "verify-sources", "premise-check", "gap-map",
    "hypothesis", "cheap-test", "ethics-check", "news-digest", "log-progress",
    "handoff", "share-pack", "to-spec", "writing-plans", "verification", "tdd",
]

_CUSTOM = ["triage", "domain-pack", "where-am-i", "frame-question", "verify-sources",
           "gap-map", "cheap-test", "ethics-check", "news-digest", "log-progress", "share-pack"]
_ADAPTED = ["grilling", "field-map", "glossary", "premise-check", "hypothesis", "handoff"]
_VENDORED = ["to-spec", "writing-plans", "verification", "tdd"]

ORIGIN = {**{s: "custom" for s in _CUSTOM},
          **{s: "adapted" for s in _ADAPTED},
          **{s: "vendored" for s in _VENDORED}}
