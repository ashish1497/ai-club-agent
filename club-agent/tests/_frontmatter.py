# What: Tiny YAML-frontmatter parser and What/How/Objective header check used by kit tests.
# How: Line-based parsing of `key: value` with one nested level; regex scan of the first body lines.
# Objective: Validate SKILL.md files and templates with no third-party dependencies.
import re

_WAO_PREFIX = r"^\s*(?:\*\*|#+\s*|<!--\s*|>\s*)?"


def parse_frontmatter(text):
    """Return (frontmatter dict, body). Raise ValueError if no frontmatter."""
    lines = text.split("\n")
    if not lines or lines[0].strip() != "---":
        raise ValueError("no frontmatter")
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        raise ValueError("no frontmatter")
    data, parent = {}, None
    for raw in lines[1:end]:
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        indented = raw[:1] in (" ", "\t")
        key, _, value = raw.strip().partition(":")
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if indented and parent is not None:
            data[parent][key] = value
        elif value == "":
            data[key], parent = {}, key
        else:
            data[key], parent = value, None
    return data, "\n".join(lines[end + 1:])


def has_wao_header(text, within_lines=15):
    """True if What:, How:, Objective: each start a line within the first N non-empty lines."""
    try:
        _, body = parse_frontmatter(text)
    except ValueError:
        body = text
    head = [l for l in body.split("\n") if l.strip()][:within_lines]
    return all(
        any(re.match(_WAO_PREFIX + label + r":", l) for l in head)
        for label in ("What", "How", "Objective")
    )
