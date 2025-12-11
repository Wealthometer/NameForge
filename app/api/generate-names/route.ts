export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!description || description.trim().length === 0) {
      return Response.json({ error: "Description is required" }, { status: 400 })
    }

    // Generate creative names using algorithmic approach
    const names = generateCreativeNames(description)

    return Response.json({ names })
  } catch (error) {
    console.error("Error generating names:", error)
    return Response.json({ error: "Failed to generate names" }, { status: 500 })
  }
}

function generateCreativeNames(description: string): Array<{ name: string; tagline: string }> {
  // Extract keywords from description
  const words = description
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2)

  // Prefixes and suffixes for creative name generation
  const prefixes = [
    "Neo",
    "Apex",
    "Zen",
    "Flux",
    "Nova",
    "Pulse",
    "Echo",
    "Velo",
    "Nexus",
    "Quantum",
    "Stellar",
    "Prism",
    "Vertex",
    "Helix",
    "Cipher",
  ]
  const suffixes = [
    "ify",
    "ly",
    "io",
    "hub",
    "flow",
    "sync",
    "core",
    "verse",
    "wave",
    "spark",
    "forge",
    "labs",
    "ai",
    "tech",
    "pro",
  ]
  const middles = [
    "Flow",
    "Sync",
    "Link",
    "Boost",
    "Smart",
    "Quick",
    "Easy",
    "Fast",
    "Cloud",
    "Data",
    "Mind",
    "Bright",
    "Swift",
    "Peak",
    "Prime",
  ]

  // Tagline templates
  const taglineTemplates = [
    (keyword: string) => `Transform your ${keyword} experience`,
    (keyword: string) => `${keyword} made simple and powerful`,
    (keyword: string) => `Elevate your ${keyword} to new heights`,
    (keyword: string) => `The future of ${keyword} is here`,
    (keyword: string) => `Revolutionizing ${keyword} for everyone`,
    (keyword: string) => `Where ${keyword} meets innovation`,
    (keyword: string) => `Your ${keyword} solution, simplified`,
    (keyword: string) => `Empowering ${keyword} excellence`,
    (keyword: string) => `Next-generation ${keyword} platform`,
    (keyword: string) => `${keyword} reimagined for modern teams`,
  ]

  const names: Array<{ name: string; tagline: string }> = []
  const usedNames = new Set<string>()

  // Strategy 1: Prefix + Suffix combinations
  for (let i = 0; i < 2 && names.length < 6; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
    const name = prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1)

    if (!usedNames.has(name.toLowerCase())) {
      usedNames.add(name.toLowerCase())
      const keyword = words[Math.floor(Math.random() * words.length)] || "business"
      const template = taglineTemplates[Math.floor(Math.random() * taglineTemplates.length)]
      names.push({ name, tagline: template(keyword) })
    }
  }

  // Strategy 2: Prefix + Middle word
  for (let i = 0; i < 2 && names.length < 6; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const middle = middles[Math.floor(Math.random() * middles.length)]
    const name = prefix + middle

    if (!usedNames.has(name.toLowerCase())) {
      usedNames.add(name.toLowerCase())
      const keyword = words[Math.floor(Math.random() * words.length)] || "workflow"
      const template = taglineTemplates[Math.floor(Math.random() * taglineTemplates.length)]
      names.push({ name, tagline: template(keyword) })
    }
  }

  // Strategy 3: Extract and combine words from description
  if (words.length >= 2) {
    for (let i = 0; i < 2 && names.length < 6; i++) {
      const word1 = words[Math.floor(Math.random() * words.length)]
      const word2 = words[Math.floor(Math.random() * words.length)]

      if (word1 !== word2) {
        // Take first part of word1 and last part of word2
        const part1 = word1.slice(0, Math.min(4, word1.length))
        const part2 = word2.slice(-Math.min(4, word2.length))
        const name = (part1 + part2).charAt(0).toUpperCase() + (part1 + part2).slice(1)

        if (name.length >= 5 && name.length <= 12 && !usedNames.has(name.toLowerCase())) {
          usedNames.add(name.toLowerCase())
          const keyword = words[Math.floor(Math.random() * words.length)] || "solution"
          const template = taglineTemplates[Math.floor(Math.random() * taglineTemplates.length)]
          names.push({ name, tagline: template(keyword) })
        }
      }
    }
  }

  // Fill remaining slots with creative combinations
  while (names.length < 6) {
    const strategy = Math.random()
    let name = ""

    if (strategy < 0.5) {
      // Prefix + random suffix
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      name = prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1)
    } else {
      // Middle + Suffix
      const middle = middles[Math.floor(Math.random() * middles.length)]
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      name = middle + suffix.charAt(0).toUpperCase() + suffix.slice(1)
    }

    if (!usedNames.has(name.toLowerCase())) {
      usedNames.add(name.toLowerCase())
      const keyword = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "innovation"
      const template = taglineTemplates[Math.floor(Math.random() * taglineTemplates.length)]
      names.push({ name, tagline: template(keyword) })
    }
  }

  return names
}
