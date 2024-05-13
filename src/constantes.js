export const LANGUAGE_VERSIONS = {  // Langages du menu déroulant et leur version à vérifier avec "liste_langages_piston.cjs"
  c: { version: "10.2.0", extension: ".c" },
  java: { version: "15.0.2", extension: ".java" },
  python: { version: "3.10.0", extension: ".py" },
  javascript: { version: "18.15.0", extension: ".js" },
  php: { version: "8.2.3", extension: ".php" },
  csharp: { version: "6.12.0", extension: ".cs" },
  typescript: { version: "5.0.3", extension: ".ts" },
};

const name = "Delbot";  // :)

export const CODE_SNIPPETS = {  // exemples de code pour chaque langage
  c: `#include <stdio.h>\n\nint main(){\n\n\tchar name[] = "`+ name + `";\n\n\tprintf("Bonjour Mr. %s en C !", name);\n\n\treturn 0;\n\n}`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tString name = "Delbot";\n\t\tSystem.out.println("Bonjour Mr. " + name  + " en Java !");\n\t}\n}\n`,
  python: `def salut(name):\n\tprint("Bonjour Mr. " + name + " en Python !")\n\nsalut("` + name + `")\n`,
  javascript: `function salut(name) {\n\tconsole.log("Bonjour Mr. " + name + " en JavaScript !");\n}\n\nsalut("` + name + `");\n`,
  php: `<?php\n\n$name = '` + name + `';\necho 'Bonjour Mr. '.$name.' en PHP !';\n?>`,
  csharp: `using System;\n\nnamespace HelloWorld\n{\n\tpublic class Hello { \n\t\tpublic static void Main(string[] args) {\n\t\t\tstring name = "`+ name + `";\n\n\t\t\tConsole.WriteLine("Bonjour Mr. " + name + " en C# !");\n\t\t}\n\t}\n}\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction salut(data: Params) {\n\tconsole.log("Bonjour Mr. " + data.name + " en TypeScript !");\n}\n\nsalut({ name: "` + name + `" });\n`,
};

export const VS_THEMES = {
  "Clair" : "vs",
  "Sombre" : "vs-dark",
  "Haut Contraste Sombre" : "hc-black",
}