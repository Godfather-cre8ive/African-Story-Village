/* ==========================================================================
   AFRICAN STORY VILLAGE — CENTRAL DATA FILE
   --------------------------------------------------------------------------
   Every piece of sample content used across the site lives here so that
   non-developers can edit stories, activities, audio and articles in ONE
   place instead of hunting through every HTML page.

   HOW TO EDIT:
   - To add a new book/story, copy an object inside `stories` and change
     the values. `slug` must be unique — it is used in story.html?slug=...
   - To add a new series, add an entry to `series` and start using its
     `id` as the `series` value on story objects.
   - Image URLs point to Unsplash placeholders. Replace `cover`, `image`
     etc. with real files (e.g. "images/books/my-book-cover.jpg") when
     ready — every reference below is a plain string, easy to find/replace.

   NOTE: All story titles, excerpts, testimonials and partner names in
   this file are SAMPLE / PLACEHOLDER content used only to demonstrate
   the website layout. They are not real published titles, real customer
   quotes, or confirmed partnerships.
   ========================================================================== */

const ASV_DATA = {

  /* ------------------------------------------------------------------ */
  /* STORY SERIES                                                        */
  /* ------------------------------------------------------------------ */
  series: [
    {
      id: "musical-forest",
      name: "The Musical Forest Adventures",
      shortName: "Musical Forest",
      ageMin: 6,
      ageMax: 12,
      color: "forest",
      description: "Follow Lara, an endlessly observant girl with a journal full of clues, as she uncovers mysteries hidden in a magical, singing forest.",
      focus: ["Observation", "Critical Thinking", "Curiosity", "Problem Solving"],
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "moonlight",
      name: "Tales by Moonlight",
      shortName: "Moonlight Tales",
      ageMin: 3,
      ageMax: 10,
      color: "moonlight",
      description: "Warm animal fables and folklore-inspired tales that pass down wisdom, wit and values the way stories have always travelled under an African night sky.",
      focus: ["Character", "Wisdom", "Cultural Appreciation", "Imagination"],
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "kingdom",
      name: "Kingdom Stories",
      shortName: "Kingdom Stories",
      ageMin: 6,
      ageMax: 14,
      color: "kingdom",
      description: "Christian moral stories built around relatable African children, families and communities — stories about faith, courage, integrity and kindness.",
      focus: ["Faith", "Courage", "Integrity", "Kindness", "Purpose"],
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "future",
      name: "Billy the Dandys",
      shortName: "Billy the Dandys",
      ageMin: 8,
      ageMax: 12,
      color: "future",
      description: "Coming soon: a detail-obsessed young detective and his crew tackle neighbourhood mysteries that reward sharp eyes and sharper questions.",
      focus: ["Observation", "Detail", "Teamwork"],
      image: "https://images.unsplash.com/photo-1503457574465-4a9773456a3d?q=80&w=1200&auto=format&fit=crop",
      comingSoon: true
    }
  ],

  /* ------------------------------------------------------------------ */
  /* STORIES / BOOKS                                                     */
  /* ------------------------------------------------------------------ */
  stories: [
    {
      id: "story-001",
      slug: "mystery-of-the-singing-tree",
      title: "The Mystery of the Singing Tree",
      series: "musical-forest",
      seriesName: "The Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      readingTime: "25 min read",
      cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=900&auto=format&fit=crop",
      excerpt: "Lara hears a melody no one else can — and follows it into a part of the forest that isn't on any map.",
      description: "When strange music drifts through the village at dusk, only Lara seems to notice. Her journal fills with sketches of footprints, broken twigs and a pattern in the leaves that keeps repeating. To find the source of the song, she'll need to trust her eyes, her ears, and the quiet parts of the forest that grown-ups walk straight past.",
      themes: ["Observation", "Curiosity"],
      learningFocus: ["Observation", "Problem Solving"],
      moralThemes: ["Patience", "Trusting your instincts"],
      author: "Ogbuagu Godsonnoel Chukwuamaka",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: true,
      activityAvailable: true,
      featured: true
    },
    {
      id: "story-002",
      slug: "laras-hidden-footprints",
      title: "Lara and the Hidden Footprints",
      series: "musical-forest",
      seriesName: "The Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      readingTime: "22 min read",
      cover: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=900&auto=format&fit=crop",
      excerpt: "A trail of unfamiliar footprints circles the village well every night — and stops exactly at Lara's window.",
      description: "Lara begins mapping every footprint she finds, comparing sizes, strides and depths in her journal. Each clue rules something out and points somewhere new, until the trail leads to a discovery far gentler than the village imagined.",
      themes: ["Observation", "Mystery"],
      learningFocus: ["Observation", "Attention to Detail"],
      moralThemes: ["Courage", "Kindness to strangers"],
      author: "Ogbuagu Godsonnoel Chukwuamaka",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: true,
      activityAvailable: true,
      featured: true
    },
    {
      id: "story-003",
      slug: "the-drum-beyond-the-river",
      title: "The Drum Beyond the River",
      series: "moonlight",
      seriesName: "Tales by Moonlight",
      ageMin: 3, ageMax: 10,
      readingTime: "12 min read",
      cover: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=900&auto=format&fit=crop",
      excerpt: "A folktale about a drum whose beat can only be heard by those willing to share what they have.",
      description: "Every full moon, a drumbeat crosses the river — but only children who have shared something that day can hear it. A gentle fable about generosity told the way grandparents have always told it, under the moonlight.",
      themes: ["Folklore", "Generosity"],
      learningFocus: ["Character", "Cultural Appreciation"],
      moralThemes: ["Generosity", "Community"],
      author: "Story Author Placeholder",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: true,
      activityAvailable: true,
      featured: true
    },
    {
      id: "story-004",
      slug: "tortoise-who-wanted-everything",
      title: "The Tortoise Who Wanted Everything",
      series: "moonlight",
      seriesName: "Tales by Moonlight",
      ageMin: 3, ageMax: 10,
      readingTime: "10 min read",
      cover: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=900&auto=format&fit=crop",
      excerpt: "A classic-style trickster tale about a tortoise whose greed finally catches up with his shell.",
      description: "Inspired by the trickster tales told across many African traditions, this story follows a clever but greedy tortoise who borrows feathers from every bird in the forest — and learns an old lesson the hard way.",
      themes: ["Folklore", "Animal Story"],
      learningFocus: ["Character", "Imagination"],
      moralThemes: ["Contentment", "Honesty"],
      author: "Story Author Placeholder",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: false,
      activityAvailable: true,
      featured: false
    },
    {
      id: "story-005",
      slug: "the-quiet-courage-of-kene",
      title: "The Quiet Courage of Kene",
      series: "kingdom",
      seriesName: "Kingdom Stories",
      ageMin: 6, ageMax: 14,
      readingTime: "18 min read",
      cover: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop",
      excerpt: "When the whole class blames Kene for something he didn't do, he has to decide what honesty really costs.",
      description: "Kene knows the truth would clear his name — but telling it might get a friend in trouble instead. A story about integrity, faith and choosing what is right even when it is quiet and unseen.",
      themes: ["Integrity", "Faith"],
      learningFocus: ["Faith", "Character"],
      moralThemes: ["Honesty", "Courage", "Forgiveness"],
      author: "Story Author Placeholder",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: true,
      activityAvailable: true,
      featured: true
    },
    {
      id: "story-006",
      slug: "the-lantern-family",
      title: "The Lantern Family",
      series: "kingdom",
      seriesName: "Kingdom Stories",
      ageMin: 6, ageMax: 14,
      readingTime: "20 min read",
      cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop",
      excerpt: "A family learns that carrying light for others sometimes starts with the smallest, least noticed acts.",
      description: "When the power goes out across the whole street, one family's small lanterns become something the entire neighbourhood needs. A warm story about purpose, service and being a light for others.",
      themes: ["Faith", "Community"],
      learningFocus: ["Faith", "Kindness"],
      moralThemes: ["Service", "Purpose"],
      author: "Story Author Placeholder",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: false,
      activityAvailable: true,
      featured: false
    },
    {
      id: "story-007",
      slug: "the-map-that-hummed",
      title: "The Map That Hummed",
      series: "musical-forest",
      seriesName: "The Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      readingTime: "24 min read",
      cover: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=900&auto=format&fit=crop",
      excerpt: "An old map in the village library seems to change every time Lara isn't looking directly at it.",
      description: "Lara notices the library's oldest map keeps shifting — a path here, a symbol there — and only careful, repeated observation reveals it's reacting to something happening in real time in the forest.",
      themes: ["Observation", "Mystery"],
      learningFocus: ["Observation", "Vocabulary"],
      moralThemes: ["Patience", "Persistence"],
      author: "Ogbuagu Godsonnoel Chukwuamaka",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: true,
      activityAvailable: true,
      featured: false
    },
    {
      id: "story-008",
      slug: "the-weavers-riddle",
      title: "The Weaver's Riddle",
      series: "moonlight",
      seriesName: "Tales by Moonlight",
      ageMin: 3, ageMax: 10,
      readingTime: "14 min read",
      cover: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?q=80&w=900&auto=format&fit=crop",
      excerpt: "A weaver offers the cleverest child in the village a riddle — solve it, and the cloth is theirs.",
      description: "A folklore-style tale celebrating wit and patience, where the answer to the weaver's riddle turns out to matter more than the prize itself.",
      themes: ["Folklore", "Wit"],
      learningFocus: ["Vocabulary", "Creativity"],
      moralThemes: ["Patience", "Humility"],
      author: "Story Author Placeholder",
      illustrator: "Illustrator Placeholder",
      amazonUrl: "#",
      audioAvailable: false,
      activityAvailable: false,
      featured: false
    }
  ],

  /* ------------------------------------------------------------------ */
  /* ACTIVITIES                                                          */
  /* ------------------------------------------------------------------ */
  activities: [
    {
      id: "act-001",
      title: "Forest Observation Journal",
      category: "Observation",
      ageMin: 6, ageMax: 12,
      relatedStorySlug: "mystery-of-the-singing-tree",
      image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=900&auto=format&fit=crop",
      description: "A printable journal page that helps children practise Lara's own observation method: sketch, describe, compare.",
      download: "downloads/observation-journal.pdf",
      featured: true
    },
    {
      id: "act-002",
      title: "Grow-a-Word Vocabulary Cards",
      category: "Vocabulary",
      ageMin: 6, ageMax: 10,
      relatedStorySlug: "the-drum-beyond-the-river",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop",
      description: "Printable word cards drawn from Tales by Moonlight, encouraging children to use new words in their own sentences.",
      download: "downloads/vocabulary-cards.pdf",
      featured: true
    },
    {
      id: "act-003",
      title: "Draw the Singing Tree",
      category: "Drawing",
      ageMin: 3, ageMax: 9,
      relatedStorySlug: "mystery-of-the-singing-tree",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop",
      description: "A guided drawing prompt inviting children to imagine what a tree that sings might actually look like.",
      download: "downloads/draw-the-singing-tree.pdf",
      featured: false
    },
    {
      id: "act-004",
      title: "Write Your Own Fable",
      category: "Creative Writing",
      ageMin: 8, ageMax: 14,
      relatedStorySlug: "tortoise-who-wanted-everything",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop",
      description: "A step-by-step worksheet that walks children through building their own animal fable with a clear moral.",
      download: "downloads/write-your-own-fable.pdf",
      featured: true
    },
    {
      id: "act-005",
      title: "Spot the Difference: Village Market",
      category: "Puzzles",
      ageMin: 5, ageMax: 10,
      relatedStorySlug: "laras-hidden-footprints",
      image: "https://images.unsplash.com/photo-1503457574465-4a9773456a3d?q=80&w=900&auto=format&fit=crop",
      description: "A printable observation puzzle set in a busy village market scene, great for building visual attention.",
      download: "downloads/spot-the-difference-market.pdf",
      featured: false
    },
    {
      id: "act-006",
      title: "Family Discussion Cards: Kindness",
      category: "Discussion",
      ageMin: 6, ageMax: 14,
      relatedStorySlug: "the-quiet-courage-of-kene",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=900&auto=format&fit=crop",
      description: "Conversation-starter cards for families to talk through the moral choices Kene faces in his story.",
      download: "downloads/discussion-cards-kindness.pdf",
      featured: true
    },
    {
      id: "act-007",
      title: "Reading Comprehension Companion",
      category: "Reading",
      ageMin: 6, ageMax: 12,
      relatedStorySlug: "the-map-that-hummed",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=900&auto=format&fit=crop",
      description: "Short comprehension questions and a vocabulary recap to use after reading The Map That Hummed.",
      download: "downloads/comprehension-companion.pdf",
      featured: false
    },
    {
      id: "act-008",
      title: "Classroom Observation Challenge",
      category: "Teacher Resources",
      ageMin: 6, ageMax: 12,
      relatedStorySlug: "mystery-of-the-singing-tree",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=900&auto=format&fit=crop",
      description: "A lesson-ready observation challenge for teachers to run with a full classroom, built around Lara's methods.",
      download: "downloads/classroom-observation-challenge.pdf",
      featured: true
    }
  ],

  /* ------------------------------------------------------------------ */
  /* AUDIO STORIES                                                       */
  /* ------------------------------------------------------------------ */
  audioStories: [
    {
      id: "audio-001",
      storySlug: "mystery-of-the-singing-tree",
      title: "The Mystery of the Singing Tree",
      series: "musical-forest",
      seriesName: "Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      duration: "8:42",
      artwork: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=900&auto=format&fit=crop",
      src: "audio/sample-story.mp3"
    },
    {
      id: "audio-002",
      storySlug: "laras-hidden-footprints",
      title: "Lara and the Hidden Footprints",
      series: "musical-forest",
      seriesName: "Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      duration: "7:58",
      artwork: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=900&auto=format&fit=crop",
      src: "audio/sample-story.mp3"
    },
    {
      id: "audio-003",
      storySlug: "the-drum-beyond-the-river",
      title: "The Drum Beyond the River",
      series: "moonlight",
      seriesName: "Tales by Moonlight",
      ageMin: 3, ageMax: 10,
      duration: "5:14",
      artwork: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=900&auto=format&fit=crop",
      src: "audio/sample-story.mp3"
    },
    {
      id: "audio-004",
      storySlug: "the-quiet-courage-of-kene",
      title: "The Quiet Courage of Kene",
      series: "kingdom",
      seriesName: "Kingdom Stories",
      ageMin: 6, ageMax: 14,
      duration: "6:37",
      artwork: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop",
      src: "audio/sample-story.mp3"
    },
    {
      id: "audio-005",
      storySlug: "the-map-that-hummed",
      title: "The Map That Hummed",
      series: "musical-forest",
      seriesName: "Musical Forest Adventures",
      ageMin: 6, ageMax: 12,
      duration: "9:05",
      artwork: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=900&auto=format&fit=crop",
      src: "audio/sample-story.mp3"
    }
  ],

  /* ------------------------------------------------------------------ */
  /* JOURNAL / BLOG POSTS                                                */
  /* ------------------------------------------------------------------ */
  journalPosts: [
    {
      id: "post-001",
      slug: "why-observation-matters",
      title: "Why Observation Might Be the Most Overlooked Skill in Childhood",
      category: "Reading",
      excerpt: "Attention to detail isn't just for detectives — it's a foundation for reading comprehension, empathy and curiosity.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop",
      readingTime: "4 min read",
      featured: true
    },
    {
      id: "post-002",
      slug: "storytelling-under-the-moonlight",
      title: "What Storytelling Under the Moonlight Taught Entire Generations",
      category: "African Stories",
      excerpt: "Long before bedtime books, oral storytelling traditions carried values, history and humour from one generation to the next.",
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=900&auto=format&fit=crop",
      readingTime: "5 min read",
      featured: true
    },
    {
      id: "post-003",
      slug: "raising-curious-readers",
      title: "Five Small Habits That Raise Genuinely Curious Readers",
      category: "Parenting",
      excerpt: "You don't need a reading chart. A few small daily habits do more for a child's curiosity than most reward systems.",
      image: "https://images.unsplash.com/photo-1503457574465-4a9773456a3d?q=80&w=900&auto=format&fit=crop",
      readingTime: "6 min read",
      featured: false
    },
    {
      id: "post-004",
      slug: "behind-the-village-founding",
      title: "Behind the Village: How a Free Blog Became a Storytelling Brand",
      category: "Behind the Village",
      excerpt: "African Story Village didn't start as a publishing company — it started as a small WordPress blog in 2018.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop",
      readingTime: "5 min read",
      featured: true
    },
    {
      id: "post-005",
      slug: "vocabulary-through-story",
      title: "Building Vocabulary the Way Stories Always Have",
      category: "Education",
      excerpt: "Children absorb far more vocabulary from a well-told story than from a flashcard deck. Here's why context wins.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=900&auto=format&fit=crop",
      readingTime: "4 min read",
      featured: false
    },
    {
      id: "post-006",
      slug: "creativity-and-constraint",
      title: "Why Constraint Actually Fuels a Child's Creativity",
      category: "Creativity",
      excerpt: "A blank page can be intimidating. A good prompt — like a strange singing tree — can be freeing.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=900&auto=format&fit=crop",
      readingTime: "3 min read",
      featured: false
    }
  ],

  /* ------------------------------------------------------------------ */
  /* TESTIMONIALS — SAMPLE / PLACEHOLDER ONLY, not genuine endorsements  */
  /* ------------------------------------------------------------------ */
  testimonials: [
    {
      quote: "My daughter now narrates everything like she's Lara looking for clues. She notices things she never used to.",
      name: "Sample Parent",
      role: "Parent, placeholder testimonial",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "We used the observation journal activity with our whole Grade 3 class. Engagement was noticeably higher than our usual worksheets.",
      name: "Sample Teacher",
      role: "Primary school teacher, placeholder testimonial",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Tales by Moonlight reminds me of the stories my own grandmother told. It's rare to find something this warm and this well made.",
      name: "Sample Parent",
      role: "Parent, placeholder testimonial",
      avatar: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Our school library added the full series and it's consistently one of the first shelves the children go to.",
      name: "Sample Librarian",
      role: "School librarian, placeholder testimonial",
      avatar: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=200&auto=format&fit=crop"
    }
  ],

  /* ------------------------------------------------------------------ */
  /* PARTNERS — PLACEHOLDER NAMES ONLY, replace before using publicly    */
  /* ------------------------------------------------------------------ */
  partners: [
    { name: "Partner Placeholder One", logo: "images/placeholders/partner-logo-1.png" },
    { name: "Partner Placeholder Two", logo: "images/placeholders/partner-logo-2.png" },
    { name: "Partner Placeholder Three", logo: "images/placeholders/partner-logo-3.png" },
    { name: "Partner Placeholder Four", logo: "images/placeholders/partner-logo-4.png" },
    { name: "Partner Placeholder Five", logo: "images/placeholders/partner-logo-5.png" },
    { name: "Partner Placeholder Six", logo: "images/placeholders/partner-logo-6.png" }
  ],

  /* ------------------------------------------------------------------ */
  /* SCHOOL PACKS                                                        */
  /* ------------------------------------------------------------------ */
  schoolPacks: [
    {
      id: "pack-starter",
      name: "Starter Reading Pack",
      price: "Price on request (placeholder)",
      books: 5,
      includes: ["5 story books across two series", "Reading comprehension companion", "Discussion prompt cards"],
      cta: "Request this pack"
    },
    {
      id: "pack-classroom",
      name: "Classroom Adventure Pack",
      price: "Price on request (placeholder)",
      books: 15,
      includes: ["15 story books, full classroom set", "Teacher activity guide", "Observation journal printables", "Optional author visit add-on"],
      cta: "Request this pack"
    },
    {
      id: "pack-library",
      name: "Library Village Pack",
      price: "Price on request (placeholder)",
      books: 30,
      includes: ["30 story books across all series", "Library display materials", "Reading programme starter kit", "Termly new-release option"],
      cta: "Request this pack"
    },
    {
      id: "pack-custom",
      name: "Custom School Pack",
      price: "Custom quote",
      books: 0,
      includes: ["Built around your school's age groups", "Choose your own series mix", "Optional author visits & training"],
      cta: "Talk to us"
    }
  ],

  /* ------------------------------------------------------------------ */
  /* READING PROGRAMMES                                                  */
  /* ------------------------------------------------------------------ */
  readingProgrammes: [
    {
      id: "prog-challenge",
      name: "African Story Village Reading Challenge",
      audience: "Ages 6–14",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop",
      description: "A termly reading challenge encouraging children to complete stories across all three series and reflect on what they noticed and learned."
    },
    {
      id: "prog-observation-club",
      name: "Observation Club",
      audience: "Ages 6–12",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=900&auto=format&fit=crop",
      description: "A weekly after-school club built around Musical Forest Adventures activities, sharpening attention to detail through games and journaling."
    },
    {
      id: "prog-story-explorer",
      name: "Story Explorer Programme",
      audience: "Ages 3–10",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop",
      description: "A read-aloud programme for younger children pairing Tales by Moonlight with simple craft and discussion activities."
    },
    {
      id: "prog-young-storytellers",
      name: "Young Storytellers Programme",
      audience: "Ages 8–14",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop",
      description: "A creative writing programme where children draft, illustrate and share their own short fables inspired by African storytelling traditions."
    }
  ],

  /* ------------------------------------------------------------------ */
  /* WHY OUR STORIES MATTER (homepage pillars)                           */
  /* ------------------------------------------------------------------ */
  pillars: [
    { title: "Creativity", copy: "Stories that leave room for a child's own imagination to fill in the gaps." },
    { title: "Observation", copy: "Mysteries and puzzles that reward noticing small, easy-to-miss details." },
    { title: "Vocabulary", copy: "Rich, age-appropriate language absorbed naturally through context." },
    { title: "Character", copy: "Moral choices explored through relatable situations, not lectures." },
    { title: "Culture", copy: "African settings, names and traditions treated with warmth and pride." },
    { title: "Faith & Purpose", copy: "Gentle Christian themes woven into Kingdom Stories where appropriate." }
  ],

  /* ------------------------------------------------------------------ */
  /* ACTIVITY VILLAGE CATEGORIES                                         */
  /* ------------------------------------------------------------------ */
  activityCategories: ["Observation", "Vocabulary", "Drawing", "Creative Writing", "Puzzles", "Discussion", "Reading", "Teacher Resources"]
};

/* Expose globally for other scripts (data.js is loaded before them) */
window.ASV_DATA = ASV_DATA;
