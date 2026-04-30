export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why PPR-C Pipes Are the Future of Industrial Piping",
    slug: "why-pprc-pipes-future-industrial-piping",
    excerpt: "Discover why PPR-C (Polypropylene Random Copolymer) pipes are rapidly replacing traditional metal piping systems in industrial applications across India.",
    content: `PPR-C pipes have revolutionized the industrial piping landscape. With a service life exceeding 50 years and resistance to temperatures up to 95°C, these pipes offer unmatched durability and performance.

**Key Advantages of PPR-C Pipes:**

1. **Corrosion Resistance** - Unlike metal pipes, PPR-C pipes are immune to corrosion, eliminating the need for regular maintenance and replacement.

2. **Chemical Resistance** - PPR-C pipes can handle a wide range of chemicals, making them ideal for chemical plants, water treatment facilities, and pharmaceutical applications.

3. **Thermal Insulation** - The low thermal conductivity of PPR-C reduces heat loss in hot water systems, leading to significant energy savings.

4. **Hygiene** - The anti-microbial inner layer prevents bacterial growth, ensuring clean water supply for drinking and food-grade applications.

5. **Easy Installation** - Fusion welding creates permanent, leak-proof joints that are stronger than the pipe itself.

At Radiatech, we supply PPR-C pipes that comply with DIN 16962 standards, ensuring the highest quality for your industrial applications.`,
    author: "R Singh",
    date: "2026-03-15",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg",
    tags: ["PPR-C", "Industrial Piping", "Supply"],
  },
  {
    id: "2",
    title: "Understanding UV Stabilized PPR-C Pipes",
    slug: "understanding-uv-stabilized-pprc-pipes",
    excerpt: "Learn about the science behind UV stabilization in PPR-C pipes and why it matters for outdoor and exposed piping installations.",
    content: `UV stabilization is a critical feature in PPR-C pipes, especially for outdoor installations. The UV stabilized outer layer protects the pipe from degradation caused by ultraviolet radiation.

**How UV Stabilization Works:**

UV stabilizers contain chemical characteristics that provide protection from UV radiation through various chemical processes. While colors like green and black already offer some UV resistance, adding UV stabilizers significantly enhances the protection.

**Benefits:**
- Extended product lifespan in outdoor installations
- Maintained thermal stability over time
- Long-term durability even under direct sunlight
- No need for additional UV protection coating

At Radiatech, our Green Therm PPR Pipes feature a UV stabilized outer layer combined with an anti-microbial inner layer, providing dual protection for your piping systems.`,
    author: "R Singh",
    date: "2026-02-20",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg",
    tags: ["UV Stabilization", "PPR-C", "Technology"],
  },
  {
    id: "3",
    title: "Industrial Piping Applications: Complete Guide",
    slug: "industrial-piping-applications-complete-guide",
    excerpt: "A comprehensive guide to the various industrial applications of PPR-C piping systems, from cooling towers to chemical plants.",
    content: `PPR-C piping systems serve a wide range of industrial applications. Understanding which applications benefit most from PPR-C can help you make informed decisions for your projects.

**Hot & Cold Water Supply:**
- Chilling plants, process cooling lines
- Cooling towers, condenser units
- Data center cooling systems

**Clean Water Supply:**
- Drinking water systems
- Plumbing applications
- DM water lines
- Solar water heaters
- Liquid food supply

**Chemical Supply:**
- Chemical plants
- Effluent treatment plants
- Sewage treatment plants
- Water treatment plants

**Air Applications:**
- Compressed air systems
- Nitrogen air lines
- Oxygen air lines
- Vacuum lines

Radiatech provides turnkey piping solutions for all these applications, with over 5 years of industry experience and 1000+ completed projects.`,
    author: "R Singh",
    date: "2026-01-10",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg",
    tags: ["Applications", "Industrial", "Guide"],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
