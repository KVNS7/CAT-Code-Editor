export const LANGUAGE_VERSIONS = {  // Langages du menu déroulant et leur version à vérifier avec "liste_langages_piston.cjs"
  c: { version: "10.2.0", extension: ".c" },
  java: { version: "15.0.2", extension: ".java" },
  python: { version: "3.10.0", extension: ".py" },
  javascript: { version: "18.15.0", extension: ".js" },
  php: { version: "8.2.3", extension: ".php" },
  csharp: { version: "6.12.0", extension: ".cs" },
  typescript: { version: "5.0.3", extension: ".ts" },
};

const name = "Bouquet";  // :)

export const CODE_SNIPPETS = {  // exemples de code pour chaque langage
  c: `#include <stdio.h>\n\nint main(){\n\n\tchar name[] = "` + name + `";\n\n\tprintf("Bonjour Mr. %s en C !", name);\n\n\treturn 0;\n\n}`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tString name = "Delbot";\n\t\tSystem.out.println("Bonjour Mr. " + name  + " en Java !");\n\t}\n}\n`,
  python: `def salut(name):\n\tprint("Bonjour Mr. " + name + " en Python !")\n\nsalut("` + name + `")\n`,
  javascript: `function salut(name) {\n\tconsole.log("Bonjour Mr. " + name + " en JavaScript !");\n}\n\nsalut("` + name + `");\n`,
  php: `<?php\n\n$name = '` + name + `';\necho 'Bonjour Mr. '.$name.' en PHP !';\n?>`,
  csharp: `using System;\n\nnamespace HelloWorld\n{\n\tpublic class Hello { \n\t\tpublic static void Main(string[] args) {\n\t\t\tstring name = "` + name + `";\n\n\t\t\tConsole.WriteLine("Bonjour Mr. " + name + " en C# !");\n\t\t}\n\t}\n}\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction salut(data: Params) {\n\tconsole.log("Bonjour Mr. " + data.name + " en TypeScript !");\n}\n\nsalut({ name: "` + name + `" });\n`,
};

export const VS_THEMES = {
  "Clair": "vs",
  "Sombre": "vs-dark",
  "Haut Contraste Sombre": "hc-black",
}

export const ONGLETS_TEST = [
  {
    id: 1,
    title: 'main' + LANGUAGE_VERSIONS['c'].extension,
    language: 'c',
    content: CODE_SNIPPETS['c']

  },
  {
    id: 2,
    title: 'script' + LANGUAGE_VERSIONS['java'].extension,
    language: 'java',
    content: CODE_SNIPPETS['java']
  },
  {
    id: 3,
    title: 'script' + LANGUAGE_VERSIONS['javascript'].extension,
    language: 'javascript',
    content: CODE_SNIPPETS['javascript']
  },
  {
    id: 4,
    title: 'main' + LANGUAGE_VERSIONS['csharp'].extension,
    language: 'csharp',
    content: CODE_SNIPPETS['csharp']
  },
  {
    id: 5,
    title: 'main' + LANGUAGE_VERSIONS['typescript'].extension,
    language: 'typescript',
    content: CODE_SNIPPETS['typescript']
  },
]

export const CONTENEURS_TEST = [
  {
    id: 1,
    name: "CAT_sandbox_SOARES_41001212",
    state: 'running',
    cpuUsage: 3.45,
    memoryUsage: 2.78,
    numEtu: "41001212"
  },
  {
    id: 2,
    name: "CAT_sandbox_THOMAS_41005727",
    state: 'stopped',
    cpuUsage: 1.67,
    memoryUsage: 4.12,
    numEtu: "41005727"
  },
  {
    id: 3,
    name: "CAT_sandbox_JEYAMOHAN_41007985",
    state: 'stopped',
    cpuUsage: 2.34,
    memoryUsage: 3.56,
    numEtu: "41007985"
  },
  {
    id: 4,
    name: "CAT_sandbox_BESNARD_41009842",
    state: 'running',
    cpuUsage: 4.02,
    memoryUsage: 1.24,
    numEtu: "41009842"
  },
  {
    id: 5,
    name: "CAT_sandbox_CERNON_40009976",
    state: 'stopped',
    cpuUsage: 3.76,
    memoryUsage: 0.98,
    numEtu: "40009976"
  },
  {
    id: 6,
    name: "CAT_sandbox_KACEM_42011891",
    state: 'running',
    cpuUsage: 4.65,
    memoryUsage: 2.49,
    numEtu: "42011891"
  }
]