export const CIF_STORAGE_KEY = "cif-completion-checklist";
const CIF_SELECTED_COURSE_KEY = "cif-selected-course";
const FACULTY_ASSIGNED_COURSE_KEY = "faculty-assigned-course";

const createCourse = ({
  key,
  code,
  title,
  sections,
  defaultCompletedTopicIds,
}) => ({
  key,
  code,
  title,
  sections,
  defaultCompletedTopicIds,
});

export const CIF_COURSES = [
  createCourse({
    key: "automata-theory",
    code: "CS301",
    title: "Automata Theory",
    sections: [
      {
        id: "automata-unit-1",
        unitTitle: "UNIT - I Introduction",
        unitHours: 2,
        unitCo: "CO1",
        topics: [
          {
            id: "automata-unit-1-topic-1",
            label:
              "1.1 Introduction to automata, computability and complexity theory",
            hours: 1,
            co: "CO1",
          },
          {
            id: "automata-unit-1-topic-2",
            label:
              "1.2 Alphabet, languages and grammars, productions and derivation, Chomsky hierarchy of languages.",
            hours: 1,
            co: "CO1",
          },
        ],
      },
      {
        id: "automata-unit-2",
        unitTitle: "UNIT - II Regular languages and finite automata",
        unitHours: 12,
        unitCo: "CO2",
        topics: [
          {
            id: "automata-unit-2-topic-1",
            label: "2.1 Regular expressions and languages.",
            hours: 2,
            co: "CO2",
          },
          {
            id: "automata-unit-2-topic-2",
            label:
              "2.2 Deterministic finite automata (DFA) and equivalence with regular expressions, nondeterministic finite automata (NFA) and equivalence with DFA, minimization of automata.",
            hours: 4,
            co: "CO2",
          },
          {
            id: "automata-unit-2-topic-3",
            label:
              "2.3 Regular grammar and equivalence with finite automata, closure properties and decision properties of regular languages, pumping lemma for regular languages, minimization of finite automata.",
            hours: 4,
            co: "CO2",
          },
          {
            id: "automata-unit-2-topic-4",
            label: "2.4 Finite automata with output- Mealy and Moore machines.",
            hours: 2,
            co: "CO2",
          },
        ],
      },
      {
        id: "automata-unit-3",
        unitTitle: "UNIT - III Context-free languages and pushdown automata",
        unitHours: 10,
        unitCo: "CO3",
        topics: [
          {
            id: "automata-unit-3-topic-1",
            label:
              "3.1 Context-free grammars (CFG) and languages (CFL), nondeterministic pushdown automata (PDA) and equivalence with CFG.",
            hours: 3,
            co: "CO3",
          },
          {
            id: "automata-unit-3-topic-2",
            label: "3.2 Chomsky and Greibach normal forms.",
            hours: 2,
            co: "CO3",
          },
          {
            id: "automata-unit-3-topic-3",
            label:
              "3.3 Parse trees, ambiguity in CFG, pumping lemma for context-free languages.",
            hours: 2,
            co: "CO3",
          },
          {
            id: "automata-unit-3-topic-4",
            label:
              "3.4 Deterministic pushdown automata, closure properties of CFLs.",
            hours: 3,
            co: "CO3",
          },
        ],
      },
      {
        id: "automata-unit-4",
        unitTitle: "UNIT - IV Context-sensitive languages",
        unitHours: 2,
        unitCo: "CO4",
        topics: [
          {
            id: "automata-unit-4-topic-1",
            label:
              "4.1 Context-sensitive grammars (CSG) and languages, linear bounded automata and equivalence with CSG.",
            hours: 2,
            co: "CO4",
          },
        ],
      },
      {
        id: "automata-unit-5",
        unitTitle: "UNIT - V Turing machines",
        unitHours: 8,
        unitCo: "CO4",
        topics: [
          {
            id: "automata-unit-5-topic-1",
            label:
              "5.1 The basic model for Turing machines (TM), variants of Turing machines, nondeterministic TMs and equivalence with deterministic TMs, TMs as enumerators.",
            hours: 5,
            co: "CO4",
          },
          {
            id: "automata-unit-5-topic-2",
            label:
              "5.2 Turing-recognizable (recursively enumerable) and Turing-decidable (recursive) languages and their closure properties, unrestricted grammars and equivalence with Turing machines.",
            hours: 3,
            co: "CO4",
          },
        ],
      },
    ],
    defaultCompletedTopicIds: [
      "automata-unit-1-topic-1",
      "automata-unit-1-topic-2",
      "automata-unit-2-topic-1",
      "automata-unit-2-topic-2",
      "automata-unit-2-topic-4",
      "automata-unit-3-topic-1",
      "automata-unit-3-topic-3",
      "automata-unit-4-topic-1",
      "automata-unit-5-topic-1",
    ],
  }),
  createCourse({
    key: "compiler-design",
    code: "CS302",
    title: "Compiler Design",
    sections: [
      {
        id: "compiler-unit-1",
        unitTitle: "UNIT - I Introduction to compilers",
        unitHours: 6,
        unitCo: "CO1",
        topics: [
          {
            id: "compiler-unit-1-topic-1",
            label: "1.1 Phases of a compiler and compiler toolchain.",
            hours: 2,
            co: "CO1",
          },
          {
            id: "compiler-unit-1-topic-2",
            label: "1.2 Lexical analysis and tokenization.",
            hours: 2,
            co: "CO1",
          },
          {
            id: "compiler-unit-1-topic-3",
            label: "1.3 Finite automata and regular expressions in scanning.",
            hours: 2,
            co: "CO1",
          },
        ],
      },
      {
        id: "compiler-unit-2",
        unitTitle: "UNIT - II Syntax analysis",
        unitHours: 8,
        unitCo: "CO2",
        topics: [
          {
            id: "compiler-unit-2-topic-1",
            label: "2.1 Context-free grammars and parsing techniques.",
            hours: 3,
            co: "CO2",
          },
          {
            id: "compiler-unit-2-topic-2",
            label: "2.2 LL and LR parsing overview.",
            hours: 3,
            co: "CO2",
          },
          {
            id: "compiler-unit-2-topic-3",
            label: "2.3 Error recovery and parse table generation.",
            hours: 2,
            co: "CO2",
          },
        ],
      },
      {
        id: "compiler-unit-3",
        unitTitle: "UNIT - III Intermediate code and optimization",
        unitHours: 7,
        unitCo: "CO3",
        topics: [
          {
            id: "compiler-unit-3-topic-1",
            label: "3.1 Intermediate representations and syntax trees.",
            hours: 2,
            co: "CO3",
          },
          {
            id: "compiler-unit-3-topic-2",
            label: "3.2 Code optimization and data-flow analysis.",
            hours: 3,
            co: "CO3",
          },
          {
            id: "compiler-unit-3-topic-3",
            label: "3.3 Code generation and register allocation.",
            hours: 2,
            co: "CO3",
          },
        ],
      },
    ],
    defaultCompletedTopicIds: [
      "compiler-unit-1-topic-1",
      "compiler-unit-1-topic-2",
      "compiler-unit-2-topic-1",
      "compiler-unit-2-topic-2",
    ],
  }),
  createCourse({
    key: "operating-systems",
    code: "CS303",
    title: "Operating Systems",
    sections: [
      {
        id: "os-unit-1",
        unitTitle: "UNIT - I Process management",
        unitHours: 6,
        unitCo: "CO1",
        topics: [
          {
            id: "os-unit-1-topic-1",
            label: "1.1 Processes, threads and CPU scheduling.",
            hours: 3,
            co: "CO1",
          },
          {
            id: "os-unit-1-topic-2",
            label: "1.2 Synchronization and deadlocks.",
            hours: 3,
            co: "CO1",
          },
        ],
      },
      {
        id: "os-unit-2",
        unitTitle: "UNIT - II Memory management",
        unitHours: 8,
        unitCo: "CO2",
        topics: [
          {
            id: "os-unit-2-topic-1",
            label: "2.1 Paging and segmentation.",
            hours: 3,
            co: "CO2",
          },
          {
            id: "os-unit-2-topic-2",
            label: "2.2 Virtual memory and page replacement.",
            hours: 3,
            co: "CO2",
          },
          {
            id: "os-unit-2-topic-3",
            label: "2.3 File system overview and storage management.",
            hours: 2,
            co: "CO2",
          },
        ],
      },
    ],
    defaultCompletedTopicIds: ["os-unit-1-topic-1", "os-unit-2-topic-1"],
  }),
];

export const DEFAULT_COMPLETED_TOPIC_IDS =
  CIF_COURSES[0].defaultCompletedTopicIds;

export const getDefaultCifCourseKey = () => CIF_COURSES[0].key;

export const getCifSelectedCourseKey = () => {
  try {
    return (
      localStorage.getItem("cif-selected-course") || getDefaultCifCourseKey()
    );
  } catch {
    return getDefaultCifCourseKey();
  }
};

export const getCifCourse = (courseKey) =>
  CIF_COURSES.find((course) => course.key === courseKey) || CIF_COURSES[0];

const FACULTY_COURSE_ASSIGNMENTS = [
  { match: "farah.khan@lnmiit.ac.in", courseKey: "automata-theory" },
  { match: "farah", courseKey: "automata-theory" },
  { match: "anand.m@lnmiit.ac.in", courseKey: "compiler-design" },
  { match: "anand", courseKey: "compiler-design" },
  { match: "vikram.s@lnmiit.ac.in", courseKey: "operating-systems" },
  { match: "vikram", courseKey: "operating-systems" },
  { match: "faculty@lnmiit.ac.in", courseKey: "automata-theory" },
];

export const resolveFacultyCourseKey = (facultyIdentity = "") => {
  const normalizedIdentity = facultyIdentity.trim().toLowerCase();
  const matchedAssignment = FACULTY_COURSE_ASSIGNMENTS.find(({ match }) =>
    normalizedIdentity.includes(match),
  );

  return matchedAssignment?.courseKey || getDefaultCifCourseKey();
};

export const getStoredFacultyCourseKey = () => {
  try {
    return (
      localStorage.getItem(FACULTY_ASSIGNED_COURSE_KEY) ||
      getDefaultCifCourseKey()
    );
  } catch {
    return getDefaultCifCourseKey();
  }
};

export const setStoredFacultyCourseKey = (courseKey) => {
  localStorage.setItem(FACULTY_ASSIGNED_COURSE_KEY, courseKey);
};

export const getCifStorageKey = (courseKey) =>
  `${CIF_STORAGE_KEY}:${courseKey}`;

export const getFlatCifTopics = (course = CIF_COURSES[0]) =>
  course.sections.flatMap((section) =>
    section.topics.map((topic) => ({
      ...topic,
      sectionTitle: section.unitTitle,
      courseTitle: course.title,
    })),
  );

export const getCifCompletionSummary = (
  completedIds,
  course = CIF_COURSES[0],
) => {
  const completedSet = new Set(completedIds);
  const allTopics = getFlatCifTopics(course);
  const totalHours = allTopics.reduce((sum, topic) => sum + topic.hours, 0);
  const completedHours = allTopics.reduce(
    (sum, topic) => sum + (completedSet.has(topic.id) ? topic.hours : 0),
    0,
  );
  const completedTopics = allTopics.filter((topic) =>
    completedSet.has(topic.id),
  ).length;

  return {
    completedHours,
    totalHours,
    completedTopics,
    totalTopics: allTopics.length,
    percent: totalHours ? Math.round((completedHours / totalHours) * 100) : 0,
  };
};
