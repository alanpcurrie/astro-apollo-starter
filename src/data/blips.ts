import type { Blip } from "@stores/radarStore";

const Blips: Array<Blip> = [
  {
    id: "1",
    name: "TypeScript",
    quadrant: "languages-frameworks",
    ring: "Adopt",
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "2",
    name: "React",
    quadrant: "languages-frameworks",
    ring: "Adopt",
    description: "A JavaScript library for building user interfaces.",
    hasAdr: false,
    tags: ["Frontend"],
  },
  {
    id: "3",
    name: "Kubernetes",
    quadrant: "Platforms",
    ring: "Adopt",
    description:
      "An open-source system for automating deployment, scaling, and management of containerized applications.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "4",
    name: "Apollo Server",
    quadrant: "Techniques",
    ring: "Trial",
    description:
      "A query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "5",
    name: "WebAssembly",
    quadrant: "Platforms",
    ring: "Assess",
    description:
      "An open standard that defines a portable binary-code format for executable programs, and a corresponding textual assembly language.",
    hasAdr: true,
    tags: ["Frontend", "Backend"],
  },
  {
    id: "6",
    name: "Terraform",
    quadrant: "Tools",
    ring: "Adopt",
    description:
      "An open-source infrastructure as code software tool that provides a consistent CLI workflow to manage hundreds of cloud services.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "7",
    name: "Docker",
    quadrant: "Platforms",
    ring: "Adopt",
    description:
      "A platform for developing, shipping, and running applications in containers.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "8",
    name: "Kafka",
    quadrant: "Tools",
    ring: "Trial",
    description:
      "A distributed streaming platform for building real-time data pipelines and streaming apps.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "9",
    name: "Flutter",
    quadrant: "languages-frameworks",
    ring: "Assess",
    description:
      "An open-source UI software development kit for building natively compiled applications.",
    hasAdr: false,
    tags: ["Frontend"],
  },
  {
    id: "10",
    name: "Rust",
    quadrant: "languages-frameworks",
    ring: "Trial",
    description:
      "A language empowering everyone to build reliable and efficient software.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "12",
    name: "GraphQL",
    quadrant: "Techniques",
    ring: "Adopt",
    description:
      "A query language for APIs and a runtime for fulfilling those queries with your existing data.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "13",
    name: "Next.js",
    quadrant: "languages-frameworks",
    ring: "Adopt",
    description:
      "A React framework for production - it makes building user interfaces with React a lot easier.",
    hasAdr: true,
    tags: ["Frontend"],
  },
  {
    id: "14",
    name: "Elasticsearch",
    quadrant: "Tools",
    ring: "Adopt",
    description:
      "A distributed search and analytics engine designed for horizontal scalability, reliability, and easy management.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "15",
    name: "Serverless Framework",
    quadrant: "Techniques",
    ring: "Trial",
    description:
      "A toolkit for deploying and operating serverless architectures, focusing on event-driven setups.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "16",
    name: "Vue.js",
    quadrant: "languages-frameworks",
    ring: "Trial",
    description:
      "An approachable, versatile, and performant JavaScript framework for building UIs and single-page applications.",
    hasAdr: true,
    tags: ["Frontend"],
  },
  {
    id: "17",
    name: "Golang",
    quadrant: "languages-frameworks",
    ring: "Adopt",
    description:
      "A statically typed language known for its simplicity, efficiency, and reliability.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "18",
    name: "Apache Kafka",
    quadrant: "Tools",
    ring: "Adopt",
    description:
      "A distributed event streaming platform capable of handling trillions of events a day.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "19",
    name: "Ansible",
    quadrant: "Tools",
    ring: "Adopt",
    description:
      "An open-source software provisioning, configuration management, and application-deployment tool.",
    hasAdr: false,
    tags: ["Backend"],
  },
  {
    id: "20",
    name: "Jenkins",
    quadrant: "Tools",
    ring: "Hold",
    description:
      "An open-source automation server which enables developers to reliably build, test, and deploy their software.",
    hasAdr: true,
    tags: ["Backend"],
  },
  {
    id: "21",
    name: "Svelte",
    quadrant: "languages-frameworks",
    ring: "Trial",
    description:
      "Innovative framework for building user interfaces. Less code, no virtual DOM, and reactive updates.",
    hasAdr: false,
    tags: ["Frontend"],
  },
  {
    id: "22",
    name: "AWS Lambda",
    quadrant: "Platforms",
    ring: "Hold",
    description:
      "An event-driven, serverless computing platform part of Amazon Web Services.",
    hasAdr: true,
    tags: ["Backend"],
  },
];

export default Blips;
