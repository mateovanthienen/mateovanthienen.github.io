/* ==========================================================================
   Blog / writing data — pulled from the existing blog.html links.
   Add new posts by copying an object and filling in the fields.
   Tags are freeform but try to reuse existing ones so the filter stays tidy.
   ========================================================================== */

const BLOG_POSTS = [
  {
    title: "Which Way Now? The Case for (and Against) One-Way Streets",
    source: "Urbe-Studio.com",
    description:
      "Fabian and I discuss the pros and cons of one-way and two-way configurations in urban streets. I added illustrations to more clearly convey our points.",
    url: "https://www.urbe-studio.com/post/which-way-now-the-case-for-and-against-one-way-streets",
    tags: ["Street Design", "Illustrated"],
  },
  {
    title: "Argentina's Renewable Energy Journey: Nine Years Later",
    source: "LinkedIn",
    description: "Two articles, nine years apart. Remarkable improvements!",
    url: "https://www.linkedin.com/pulse/argentinas-renewable-energy-journey-nine-years-later-van-thienen-yxzmf",
    tags: ["Energy & Sustainability", "International"],
  },
  {
    title: "Lessons Learned from Bikeway Design in Buenos Aires",
    source: "Medium.com",
    description:
      "In this illustrated article, I discuss the design features of bikeways in Buenos Aires and how they could inform design decisions in the U.S.",
    url: "https://medium.com/@mateovtn/lessons-learned-from-bikeway-design-in-buenos-aires-b247c2afd6f6",
    tags: ["Bicycle Infrastructure", "International", "Illustrated"],
  },
  {
    title: "My Thoughts on AI and Architecture",
    source: "Medium.com — Data Driven Investor",
    description: "In this article, I discuss the future of architecture and urban design.",
    url: "https://medium.com/datadriveninvestor/my-thoughts-on-ai-architecture-c8806b826273",
    tags: ["Opinion", "Technology"],
  },
  {
    title: "UF Should Put Money Into RTS, Not a Parking Garage",
    source: "The Alligator",
    description: "My point of view on the University of Florida's investment in a new parking garage on campus.",
    url: "https://www.alligator.org/opinion/uf-should-put-money-into-rts-not-a-parking-garage/article_99cdde2c-b7be-11e8-8cec-c716f4e60893.html",
    tags: ["Opinion", "Transit"],
  },
  {
    title: "My Thoughts on Dockless eScooters",
    source: "Medium.com",
    description:
      "I share how I believe this new form of mobility should be regulated, based on what I learned while working at the City of Oakland's Department of Transportation.",
    url: "https://medium.com/@mateovtn/my-thoughts-on-dockless-e-scooters-c103278562cd",
    tags: ["Opinion", "Micromobility"],
  },
  {
    title: "A Metro-Style Pedestrian Map for UF",
    source: "Medium.com",
    description: "The metro-style wayfinding map I created for pedestrians on the University of Florida's campus.",
    url: "https://medium.com/@mateovtn/a-metro-style-pedestrian-map-for-uf-3c259d3adbf3",
    tags: ["Wayfinding", "University of Florida"],
  },
  {
    title: "Analysis of Bikesharing in Buenos Aires",
    source: "LinkedIn",
    description: "A look at the performance of the bikeshare system in Buenos Aires in 2018.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6478447722096586752",
    tags: ["Bicycle Infrastructure", "International", "Data Analysis"],
  },
  {
    title: "Argentina's Renewable Energy Potential",
    source: "Abogados inHouse",
    description:
      "How distributed generation of renewable energy can help overcome Argentina's energy crisis by leveraging private investment. Installed capacities and generation factors calculated using CIA World Factbook data.",
    url: "files/20161123144824.pdf",
    tags: ["Energy & Sustainability", "International", "Data Analysis"],
  },
  {
    title: "Automating Key Datasets for openGNV Data Portal",
    source: "Medium.com",
    description: "A summary of my work as a Digital Services Fellow at the City of Gainesville.",
    url: "https://medium.com/@uffellows/automating-key-datasets-for-opengnv-data-portal-ab478d4d5416",
    tags: ["GIS & Data", "University of Florida"],
  },
  {
    title: "Improving Transit Ridership Through Graphic Design",
    source: "Medium.com",
    description:
      "Collaborative work with the Visual Design Fellow to improve transit ridership while at the City of Gainesville.",
    url: "https://medium.com/@uffellows/improving-transit-ridership-through-graphic-design-c710b939b707",
    tags: ["Transit", "Graphic Design"],
  },
  {
    title: "EV Life",
    source: "YouTube",
    description:
      "A YouTube channel documenting what it was like to own and drive an electric car as a college student.",
    url: "https://www.youtube.com/channel/UCal6aF7fWNjbnSGnI9x7oSg",
    tags: ["Personal", "Electric Vehicles"],
  },
];
