exports.roadblocks = [
    {
      name: "Crédits",
      credits_obtains: 0,
      credits_needed: 60,
      credits_remains: 0
    },
    {
      name: "Anglais",
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      score_needed: [
        // Tek 1
        600,
        // Tek 2
        700,
        // Tek 3,
        750
      ]
    },
    // {
    //   name: "Roadblocks",
    // },
    {
      name: "Foundation",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      details: [
        { // Tek 1
          needed: 25,
          modules: [
            {codemodule: "B-CPE-100", codeinstance: "1-1", projects: ["FirTree", "Match/NMatch", "Lib Workshop"]},
            {codemodule: "B-CPE-101", codeinstance: "1-1", projects: ["InfinAdd", "Bistro-Matic", "EvalExpr"]},
            {codemodule: "B-CPE-110", codeinstance: "1-1", projects: ["BSQ", "Pushswap"]},
            {codemodule: "B-CPE-111", codeinstance: "1-1", projects: ["GetNextLine", "Matchstick"]},
            {codemodule: "B-PSU-100", codeinstance: "1-1", projects: ["my_printf", "my_sokoban"]},
            {codemodule: "B-PSU-101", codeinstance: "1-1", projects: ["my_ls", "Minishell 1"]},
            {codemodule: "B-CPE-200", codeinstance: "2-1", projects: ["Corewar"]},
            {codemodule: "B-CPE-201", codeinstance: "2-1", projects: ["Dante's star", "Lem-in"]},
            {codemodule: "B-PSU-200", codeinstance: "2-1", projects: ["Navy", "Tetris"]},
            {codemodule: "B-PSU-210", codeinstance: "2-1", projects: ["Minishell 2", "42sh"]},
            {codemodule: "B-MET-100", codeinstance: "1-1", projects: ["Profesionnal Competencies"]},
            {codemodule: "B-MET-200", codeinstance: "2-1", projects: ["Profesionnal Competencies"]},
          ]
        },
        { // Tek 2
          needed: 15,
          modules: [
            {codemodule: "B-CCP-400", codeinstance: "4-1", projects: ["Plazza"]},
            {codemodule: "B-NWP-400", codeinstance: "4-1", projects: ["my_ftp", "my_teams"]},
            {codemodule: "B-OOP-400", codeinstance: "4-1", projects: ["Arcade", "NanoTekSpice"]},
            {codemodule: "B-PSU-400", codeinstance: "4-1", projects: ["Malloc", "nm/objdump"]},
            {codemodule: "B-YEP-400", codeinstance: "4-1", projects: ["Indie Studio"]},
            {codemodule: "B-YEP-410", codeinstance: "4-1", projects: ["Zappy"]},
            {codemodule: "B-CPP-300", codeinstance: "3-1", projects: ["Piscine C++"]},
            {codemodule: "B-MET-400", codeinstance: "4-1", projects: ["Profesionnal Competencies"]}
          ]
        },
        { // Tek 3
          needed: 10,
          modules: [
            {codemodule: "B-CPP-500", codeinstance: "5-1", projects: ["C++ - Babel"]},
            {codemodule: "B-CPP-501", codeinstance: "5-1", projects: ["C++ - R-Type"]},
            {codemodule: "B-CPP-510", codeinstance: "5-1", projects: ["C++ - Zia"]},
            {codemodule: "B-DEV-500", codeinstance: "5-1", projects: ["AppDev - Dashboard"]},
            {codemodule: "B-DEV-501", codeinstance: "5-1", projects: ["AppDev - Epicture"]},
            {codemodule: "B-DEV-510", codeinstance: "5-1", projects: ["AppDev - AREA"]},
            {codemodule: "B-FUN-500", codeinstance: "5-1", projects: ["Functional - evalExpr"]},
            {codemodule: "B-FUN-501", codeinstance: "5-1", projects: ["Functional - HAL"]},
            {codemodule: "B-FUN-510", codeinstance: "5-1", projects: ["Functional - KOAK"]},
            {codemodule: "B-YEP-500", codeinstance: "5-1", projects: ["Year-End Project"]}
          ]
        }
      ]
    },
    {
      name: "Supplement",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      details: [
        { // Tek 1
          needed: 8,
          modules: [
            {codemodule: "B-MUL-100", codeinstance: "1-1", projects: ["MyRadar", "MyScreenSaver", "MyHunter", "MyRunner"]},
            {codemodule: "B-MAT-100", codeinstance: "1-1", projects: ["101pong", "102architect", "103cipher", "104intersection", "105torus"]},
            {codemodule: "B-MUL-200", codeinstance: "2-1", projects: ["MyDefender", "MyWorld", "MyRPG"]},
            {codemodule: "B-AIA-200", codeinstance: "2-1", projects: ["Need4Stek"]},
            {codemodule: "B-SAD-200", codeinstance: "2-1", projects: ["my_web"]},
            {codemodule: "B-WEB-200", codeinstance: "2-1", projects: ["EpyTodo"]},
            {codemodule: "B-MAT-200", codeinstance: "2-1", projects: ["106bombyx", "107transfer", "108trigo", "109titration", "110borwein"]},
            {codemodule: "B-SEC-200", codeinstance: "2-1", projects: ["Call For Papers", "NOOB"]},
          ]
        },
        { // Tek 2
          needed: 4,
          modules: [
            {codemodule: "B-CNA-410", codeinstance: "4-1", projects: ["Groundhog"]},
            {codemodule: "B-MAT-400", codeinstance: "4-1", projects: ["201yams", "202unsold", "203hotline", "204ducks", "205IQ", "206neutrinos", "207demography", "208dowels", "209poll"]},
            {codemodule: "B-NSA-400", codeinstance: "4-1", projects: ["SNA"]},
            {codemodule: "B-PSU-402", codeinstance: "4-1", projects: ["ftrace", "strace"]},
            {codemodule: "B-ASM-400", codeinstance: "4-1", projects: ["MiniLibC"]},
            {codemodule: "B-FUN-400", codeinstance: "4-1", projects: ["Wolfram", "Image Compressor"]},
            {codemodule: "B-SEC-400", codeinstance: "4-1", projects: ["Shodan"]},
            {codemodule: "B-DOP-400", codeinstance: "4-1", projects: ["Popeye", "my_marvin"]}
          ]
        },
        { // Tek 3
          needed: 2,
          modules: [
            {codemodule: "B-AIA-500", codeinstance: "5-1", projects: ["Gomoku"]},
            {codemodule: "B-MAT-500", codeinstance: "5-1", projects: ["301dannon", "302separation", "303make", "304pacman", "305construction", "306radiator", "307multigrains", "308reedpipes", "309pollution"]},
            {codemodule: "B-SEC-500", codeinstance: "5-1", projects: ["Call For Papers", "CAESAR"]},
            {codemodule: "B-DOP-500", codeinstance: "5-1", projects: ["Popeye", "my_marvin", "Bernstein"]}
          ]
        }
      ]
    },
    {
      name: "Innovation",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      details: [
        { // Tek 1
          needed: 4,
          modules: [
            {codemodule: "B-INN-200", codeinstance: "2-1", hub: true, projects: ["Experiences / Workshop / Talk / Meetup / Hackathon / Projet Hub"]},
            {codemodule: "G-JAM-001", codeinstance: "0-1", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-2", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-3", projects: ["Epitech JAM"]},
            {codemodule: "G-CUS-001", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-002", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-003", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-004", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-005", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-006", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-007", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-008", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-009", codeinstance: "0-1", projects: ["Video presentation"]},
          ]
        },
        { // Tek 2
          needed: 4,
          modules: [
            {codemodule: "B-INN-400", codeinstance: "4-1", hub: true, projects: ["Experiences / Workshop / Talk / Meetup / Hackathon / Projet Hub"]},
            {codemodule: "G-JAM-001", codeinstance: "0-1", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-2", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-3", projects: ["Epitech JAM"]},
            {codemodule: "G-CUS-006", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-007", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-008", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-009", codeinstance: "0-1", projects: ["Video presentation"]},
          ]
        },
        { // Tek 3
          needed: 13,
          modules: [
            {codemodule: "B-INN-500", codeinstance: "5-1", hub: true, projects: ["Experiences / Workshop / Talk / Meetup / Hackathon / Projet Hub"]},
            {codemodule: "B-EIP-500", codeinstance: "FR-5-1", projects: ["Validation EIP"]},
            {codemodule: "B-MOO-500", codeinstance: "5-1", projects: ["Piscine Moonshot"]},
            {codemodule: "B-MOO-501", codeinstance: "5-1", projects: ["Pitch Deck & Design Thinking"]},
            {codemodule: "B-MOO-502", codeinstance: "5-1", projects: ["Forward"]},
            {codemodule: "B-PRO-500", codeinstance: "5-1", projects: ["Part-Time Job"]},
            {codemodule: "G-JAM-001", codeinstance: "0-1", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-2", projects: ["Epitech JAM"]},
            {codemodule: "G-JAM-001", codeinstance: "0-3", projects: ["Epitech JAM"]},
            {codemodule: "G-CUS-001", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-002", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-003", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-004", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-005", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-006", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-007", codeinstance: "0-1", projects: ["Video presentation"]}, {codemodule: "G-CUS-008", codeinstance: "0-1", projects: ["Video presentation"]},
            {codemodule: "G-CUS-009", codeinstance: "0-1", projects: ["Video presentation"]},
          ]
        }
      ]
    },
    {
      name: "Soft Skills",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      details: [
        { // Tek 1
          needed: 3,
          modules: [
            {codemodule: "B-ANG-001", codeinstance: "0-1", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-2", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-2", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-3", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-4", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-FRE-100", projects: ["Mail professionnel", "RUSH - Les Seigneurs des mots", "Lettre argumentée"]},
            {codemodule: "B-FRE-200", projects: ["\"Le mode d'emploi : prendre le lecteur par la main\"", "\"Faire préciser\"", "\"La lettre de vente : informer, argumenter, valoriser\""]},
            {codemodule: "B-PCP-000", pcp: true},
            {codemodule: "G-EPI-004"},
            {codemodule: "G-FRE-010", codeinstance: "FR-0-1"}
          ]
        },
        { // Tek 2
          needed: 3,
          modules: [
            {codemodule: "B-FRE-400", projects: ["Mission délicate : recadrer un collègue", "Diaporama pour décrocher 1 million de dollars", "Rédiger un bilan d'expérience"]},
            {codemodule: "B-PCP-000", pcp: true},
            {codemodule: "G-EPI-004"},
            {codemodule: "B-ANG-001", codeinstance: "0-4", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-5", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-6", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-7", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]}
          ]
        },
        { // Tek 3
          needed: 3,
          modules: [
            {codemodule: "B-FRE-501", projects: ["Avocat du diable", "3 emails", "Mémo professionnel", "Informer : Le magazine du geek"]},
            {codemodule: "B-ANG-001", codeinstance: "0-1", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-2", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-ANG-001", codeinstance: "0-3", projects: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]},
            {codemodule: "B-PCP-000", pcp: true},
            {codemodule: "G-FRE-010", codeinstance: "FR-0-1"},
            {codemodule: "G-EPI-004"}
          ]
        }
      ]
    },
    {
      name: "Extra Units",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      details: [
        { // Tek 1
          needed: 0,
          modules: [
            {codemodule: "B-CPE-210", projects: ["Solo Stumper 1", "Solo Stumper 2", "Solo Stumper 3", "Solo Stumper 4", "Solo Stumper 5", "Solo Stumper 6", "Stumper 1", "Stumper 2", "Stumper 3", "Stumper 4", "Stumper 5", "Stumper 6", "Stumper 7"]},
            {codemodule: "G-EPI-010"}
          ]
        },
        { // Tek 2
          needed: 0,
          modules: [
            {codemodule: "G-EPI-010"}
          ]
        },
        { // Tek 3
          needed: 20,
          modules: [
            {codemodule: "B-PRO-600", projects: ["Internship"]},
            {codemodule: "G-EPI-010"}
          ]
        }
      ]
    },
    {
      name: "Modules hors roadblocks",
      is_roadblock: true,
      credits_obtains: 0,
      credits_needed: 0,
      credits_remains: 0,
      other: true,
      details: [
        { // Tek 1
          needed: 0,
          modules: [
            {codemodule: "B-EPI-110", projects: ["IONIS Startup"]}
          ]
        },
        { // Tek 2
          needed: 20,
          modules: [
            {codemodule: "B-EPI-300", projects: ["Project Week"]},
            {codemodule: "B-PRO-300", projects: ["Internship"]}
          ]
        },
        { // Tek 3
          needed: 0,
          modules: [
          ]
        }
      ]
    }
  ];
