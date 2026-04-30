export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  specifications?: Record<string, string>;
  applications?: string[];
  image: string;
  images?: string[];
  isNewArrival?: boolean;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: ProductCategory[] = [
  {
    slug: "ppr-pipes",
    name: "PPR Pipes",
    description: "Premium quality PPR-C pipes available in sizes from 20MM to 615 MM with pressure ratings from PN 6 to PN 20. DIN 16962 compliant with UV stabilized outer layer and anti-microbial inner layer.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg",
    productCount: 4,
  },
  {
    slug: "ppr-pipe-fittings",
    name: "PPR Pipe Fittings",
    description: "Complete range of PPR pipe fittings including tees, elbows, couplers, clamps, and reducers for industrial piping applications.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg",
    productCount: 5,
  },
  {
    slug: "pprc-fittings",
    name: "PPRC Fittings",
    description: "High-quality PPRC fittings including couplers, flanges, reducers, and specialized pipe fittings for construction and industrial use.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg",
    productCount: 7,
  },
  {
    slug: "pipes-fittings",
    name: "Pipes & Fittings",
    description: "Complete piping solutions for industrial applications including hot/cold water supply, chemical plants, and cooling systems.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg",
    productCount: 2,
  },
  {
    slug: "compressed-air-pipe-fittings",
    name: "Compressed Air Pipe Fittings",
    description: "Specialized piping solutions for compressed air lines, chemical lines, vacuum lines, and nitrogen air applications.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg",
    productCount: 1,
  },
  {
    slug: "industrial-piping-services",
    name: "Industrial Piping Services",
    description: "End-to-end industrial piping installation, lining, and maintenance services for process industries.",
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM (1).jpeg",
    productCount: 3,
  },
];

export const products: Product[] = [
  // PPR Pipes
  {
    id: "fusion-ppr-pipes",
    name: "Fusion PPR Pipes",
    category: "PPR Pipes",
    categorySlug: "ppr-pipes",
    description: "High-quality Fusion PPR pipes designed for industrial and commercial applications. Available in multiple sizes with excellent heat and chemical resistance. UV stabilized outer layer ensures long-term durability even in exposed installations.",
    specifications: {
      "Material": "PPR-C (Polypropylene Random Copolymer Type 3)",
      "Size Range": "20MM to 615 MM",
      "Pressure Rating": "PN 6 to PN 20",
      "Standard": "DIN 16962",
      "Temperature Range": "Up to 95°C",
      "Service Life": "50+ years",
      "Color": "Green / White",
    },
    applications: ["Hot/Cold Water Supply", "Chemical Plants", "Cooling Towers", "Condensor Lines"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg",
  },
  {
    id: "fusion-ppr-pipe-pn16",
    name: "Fusion PPR Pipe PN 16 Waterline Special",
    category: "PPR Pipes",
    categorySlug: "ppr-pipes",
    description: "Specialized PN 16 rated PPR pipes designed specifically for waterline applications. Features anti-microbial inner layer that prevents bacterial growth, making it ideal for clean water and drinking water supply systems.",
    specifications: {
      "Material": "PPR-C Type 3",
      "Pressure Rating": "PN 16",
      "Standard": "DIN 16962",
      "Temperature Range": "Up to 95°C",
      "Inner Layer": "Anti-microbial",
      "Outer Layer": "UV Stabilized",
      "Service Life": "50+ years",
    },
    applications: ["Drinking Water Supply", "Plumbing", "DM Water Lines", "Liquid Food Supply"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg",
  },
  {
    id: "green-therm-ppr-pipes",
    name: "Green Therm PPR Pipes",
    category: "PPR Pipes",
    categorySlug: "ppr-pipes",
    description: "Premium Green Therm PPR pipes with enhanced thermal properties. The UV stabilized green outer layer provides superior protection while the anti-microbial inner layer ensures hygiene in all water supply applications.",
    specifications: {
      "Material": "PPR-C Type 3 with UV Stabilizer",
      "Size Range": "20mm to 160mm",
      "Pressure Rating": "PN 10 to PN 20",
      "Standard": "DIN 16962",
      "UV Protection": "Yes - Green UV Stabilized Layer",
      "Anti-microbial": "Yes - Inner Layer",
      "Service Life": "50+ years",
    },
    applications: ["Solar Water Heater", "Hot Water Supply", "Industrial Cooling", "Process Lines"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg",
  },
  {
    id: "fusion-ppr-pipes-standard",
    name: "Fusion PPR Pipes - Standard Range",
    category: "PPR Pipes",
    categorySlug: "ppr-pipes",
    description: "Standard range Fusion PPR pipes for general-purpose industrial piping. Excellent chemical resistance, smooth inner surface for low friction, and sound insulation properties.",
    specifications: {
      "Material": "PPR-C",
      "Friction Factor": "1.5 Ft/100 Ft",
      "Chemical Resistance": "Excellent",
      "Sound Insulation": "Yes",
      "Frost Proof": "Yes",
      "Leak Proof": "Yes",
    },
    applications: ["Chilled Water Supply", "Pharmaceutical Industries", "RO Plants", "Fire Applications"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg",
  },

  // PPR Pipe Fittings
  {
    id: "ppr-reducing-tee",
    name: "PPR Reducing Tee 63MM x 50MM",
    category: "PPR Pipe Fittings",
    categorySlug: "ppr-pipe-fittings",
    description: "High-quality PPR reducing tee fitting for transitioning between different pipe sizes. Supplied to DIN 16962 standards for reliable performance in industrial piping systems.",
    specifications: {
      "Size": "63MM x 50MM",
      "Material": "PPR-C",
      "Type": "Reducing Tee",
      "Connection": "Fusion Welding",
      "Standard": "DIN 16962",
    },
    applications: ["Pipeline Branching", "Size Reduction", "Industrial Piping"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg",
  },
  {
    id: "fusion-pprc-elbow-50mm",
    name: "Fusion PPRC Elbow 50MM",
    category: "PPR Pipe Fittings",
    categorySlug: "ppr-pipe-fittings",
    description: "50MM PPRC elbow fitting for directional changes in piping systems. Engineered for perfect alignment and leak-proof joints through fusion welding.",
    specifications: {
      "Size": "50MM",
      "Material": "PPRC",
      "Angle": "90°",
      "Connection": "Fusion Welding",
    },
    applications: ["Direction Change", "Pipeline Routing", "Industrial Systems"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg",
  },
  {
    id: "fusion-ppr-coupler",
    name: "Fusion PPR Coupler",
    category: "PPR Pipe Fittings",
    categorySlug: "ppr-pipe-fittings",
    description: "Standard PPR coupler for joining two pipes of the same diameter. Ensures a secure, leak-proof connection through fusion welding technology.",
    specifications: {
      "Size Range": "20MM to 110MM",
      "Material": "PPR-C",
      "Connection": "Fusion Welding",
      "Standard": "DIN 16962",
    },
    applications: ["Pipe Joining", "Extension", "Repair"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg",
  },
  {
    id: "ppr-tee-blue",
    name: "PPR Tee Blue",
    category: "PPR Pipe Fittings",
    categorySlug: "ppr-pipe-fittings",
    description: "Blue PPR tee fitting for creating three-way junctions in pipeline systems. Color-coded for easy identification of cold water lines.",
    specifications: {
      "Material": "PPR-C",
      "Color": "Blue",
      "Type": "Equal Tee",
      "Connection": "Fusion Welding",
    },
    applications: ["Cold Water Systems", "Pipeline Branching", "Distribution Networks"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg",
  },
  {
    id: "fusion-ppr-clamp",
    name: "Fusion PPR Clamp 20MM to 63MM",
    category: "PPR Pipe Fittings",
    categorySlug: "ppr-pipe-fittings",
    description: "PPR pipe clamps available in sizes from 20MM to 63MM for secure pipe mounting and support in vertical and horizontal installations.",
    specifications: {
      "Size Range": "20MM to 63MM",
      "Material": "PPR-C",
      "Type": "Pipe Clamp / Support",
    },
    applications: ["Pipe Mounting", "Wall Support", "Overhead Piping"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg",
  },

  // PPRC Fittings
  {
    id: "pprc-coupler",
    name: "PPRC Coupler",
    category: "PPRC Fittings",
    categorySlug: "pprc-fittings",
    description: "Premium PPRC coupler for joining PPRC pipes. Supplied for leak-proof fusion welded connections in industrial applications.",
    specifications: {
      "Material": "PPRC",
      "Connection": "Fusion Welding",
      "Standard": "DIN 16962",
    },
    applications: ["Industrial Piping", "Water Supply", "Chemical Lines"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg",
  },
  {
    id: "pprc-pipe-fittings-6inch",
    name: "PPRC Pipe Fittings 6 inch Elbow",
    category: "PPRC Fittings",
    categorySlug: "pprc-fittings",
    description: "6-inch PPRC elbow fitting designed for large-diameter piping systems used in water supply and industrial applications.",
    specifications: {
      "Size": "6 inch",
      "Type": "Elbow",
      "Material": "PPRC",
      "Application": "Water / Industrial",
    },
    applications: ["Water Supply", "Industrial Piping", "Construction"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg",
  },
  {
    id: "pprc-pipe-fittings-34",
    name: "3/4 inch PPRC Pipe & Fittings",
    category: "PPRC Fittings",
    categorySlug: "pprc-fittings",
    description: "3/4 inch PPRC pipe and fittings for construction and plumbing applications. Includes elbow fittings for directional changes.",
    specifications: {
      "Size": "3/4 inch",
      "Type": "Pipe & Elbow",
      "Material": "PPRC",
      "Use": "Construction",
    },
    applications: ["Construction", "Plumbing", "Residential"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg",
  },
  {
    id: "pprc-flange-fusion",
    name: "PPRC Flange (Fusion)",
    category: "PPRC Fittings",
    categorySlug: "pprc-fittings",
    description: "Fusion-type PPRC flange for connecting PPRC piping systems to metal piping or equipment. Essential for industrial installations requiring detachable connections.",
    specifications: {
      "Material": "PPRC",
      "Type": "Fusion Flange",
      "Connection": "Fusion + Bolted",
    },
    applications: ["Equipment Connection", "System Integration", "Maintenance Points"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM (1).jpeg",
  },
  {
    id: "fusion-pprc-reducer",
    name: "Fusion PPRC Reducer",
    category: "PPRC Fittings",
    categorySlug: "pprc-fittings",
    description: "PPRC reducer for transitioning between different pipe diameters. Ensures smooth flow transition and minimal pressure loss.",
    specifications: {
      "Material": "PPRC",
      "Type": "Reducer",
      "Connection": "Fusion Welding",
    },
    applications: ["Size Transition", "Flow Management", "Industrial Piping"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg",
  },

  // Compressed Air Pipe Fittings  
  {
    id: "industrial-piping-work",
    name: "Industrial Piping Work for Air/Chemical/Vacuum Line",
    category: "Compressed Air Pipe Fittings",
    categorySlug: "compressed-air-pipe-fittings",
    description: "Complete industrial piping solutions for compressed air lines, chemical supply lines, vacuum lines, and nitrogen air applications. Turnkey installation with quality assurance.",
    specifications: {
      "Service": "Turnkey Piping Installation",
      "Applications": "Air / Chemical / Vacuum Lines",
      "Material": "PPR-C / PPRC",
      "Standards": "DIN 16962",
    },
    applications: ["Compressed Air", "Nitrogen Air", "Oxygen Air", "Vacuum Lines", "Chemical Plants"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg",
  },

  // New Items
  {
    id: "pprc-ball-valve",
    name: "PPRC Ball Valve",
    category: "New Items",
    categorySlug: "pprc-fittings",
    description: "High-quality PPRC ball valve for flow control in piping systems. Easy operation with full bore design for minimal flow restriction.",
    specifications: {
      "Material": "PPRC",
      "Type": "Ball Valve",
      "Operation": "Manual",
      "Bore": "Full Bore",
    },
    applications: ["Flow Control", "Shut-off", "Process Control"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg",
    isNewArrival: true,
  },
  {
    id: "mta-male-threaded-adaptor",
    name: "MTA Male Threaded Adaptor",
    category: "New Items",
    categorySlug: "pprc-fittings",
    description: "Male threaded adaptor for connecting PPRC piping to threaded metal fittings. Essential for hybrid piping installations.",
    specifications: {
      "Material": "PPRC + Brass Insert",
      "Type": "Male Threaded Adaptor (MTA)",
      "Connection": "Fusion + Threaded",
    },
    applications: ["Metal-to-PPRC Transition", "Equipment Connection", "Valve Installation"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg",
    isNewArrival: true,
  },
  {
    id: "pprc-fta-50",
    name: "PPRC FTA 50",
    category: "New Items",
    categorySlug: "pprc-fittings",
    description: "50MM Female Threaded Adaptor (FTA) for connecting PPRC piping to threaded components. Precision brass insert for reliable threaded connections.",
    specifications: {
      "Size": "50MM",
      "Material": "PPRC + Brass Insert",
      "Type": "Female Threaded Adaptor (FTA)",
      "Connection": "Fusion + Threaded",
    },
    applications: ["Threaded Connection", "Equipment Interface", "System Integration"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg",
    isNewArrival: true,
  },
  {
    id: "pprc-tank-nipple",
    name: "PPRC Tank Nipple",
    category: "New Items",
    categorySlug: "pprc-fittings",
    description: "PPRC tank nipple for connecting piping systems to tanks and vessels. Waterproof seal design ensures leak-free operation.",
    specifications: {
      "Material": "PPRC",
      "Type": "Tank Nipple",
      "Seal": "Waterproof",
    },
    applications: ["Tank Connection", "Vessel Interface", "Water Storage"],
    image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg",
    isNewArrival: true,
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
