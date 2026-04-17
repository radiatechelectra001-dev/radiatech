export interface Review {
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
}

export const reviews: Review[] = [
  { name: "Mahesh Kumar", location: "Ikauna, Uttar Pradesh", rating: 5, date: "16 Feb 2025", product: "LED Bulb Housing" },
  { name: "Abhishek Chauhan", location: "Noida, Uttar Pradesh", rating: 5, date: "01 Feb 2025", product: "LED Concealed Lights" },
  { name: "Anurag", location: "Meerut, Uttar Pradesh", rating: 5, date: "17 Mar 2022", product: "Metal Core PCB" },
  { name: "Vasim Ansari", location: "Indore, Madhya Pradesh", rating: 5, date: "30 Mar 2026", product: "PPR Pipe" },
  { name: "Amit Agrawal", location: "Sitarganj, Uttarakhand", rating: 5, date: "01 Dec 2024", product: "LED Bulb Raw Material" },
  { name: "Rakesh Jain", location: "New Delhi, Delhi", rating: 5, date: "29 May 2023", product: "Focus Lights" },
  { name: "Wasim", location: "Kolkata, West Bengal", rating: 5, date: "20 Jan 2023", product: "Wall Mounted LED Lights" },
  { name: "Smrutiranjan Patra", location: "Baleshwar, Odisha", rating: 5, date: "27 May 2022", product: "LED Bulb Housing" },
  { name: "Mohit Yadav", location: "Indore, Madhya Pradesh", rating: 5, date: "07 Feb 2022", product: "LED Floodlight" },
  { name: "Sk Ahamad Hossain", location: "Chennai, Tamil Nadu", rating: 5, date: "31 Jul 2022", product: "LED Bulb Housing" },
  { name: "Niraj Kumar Dev", location: "Jasidih, Jharkhand", rating: 1, date: "05 Jan 2025", product: "LED Bulb" },
  { name: "Umesh Kashyap", location: "Hoshangabad, Madhya Pradesh", rating: 1, date: "30 Sep 2024", product: "LED Bulb" },
];

export const overallRating = {
  average: 4.0,
  total: 12,
  satisfaction: "66%",
  quality: "100%",
  delivery: "100%",
  distribution: { 5: 67, 4: 0, 3: 0, 2: 0, 1: 33 },
};
