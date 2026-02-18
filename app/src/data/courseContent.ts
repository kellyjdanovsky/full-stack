export interface Lesson {
    title: string;
    content: string;
    codeExample?: string;
    tips?: string[];
}

export interface Module {
    title: string;
    duration: string;
    topics: string[];
    lesson?: Lesson;
}

export interface CourseLevel {
    level: string;
    color: string;
    duration: string;
    modules: Module[];
}

// 📌 RAPPEL : Pour voir les leçons complètes, cliquez sur les modules dans l'interface.

// ==========================================
// 1. HTML & CSS (ULTRA EXPANDED)
// ==========================================
export const htmlCssContent: CourseLevel[] = [
    {
        level: 'Débutant : Fondations',
        color: '#00E676',
        duration: '4 semaines',
        modules: [
            {
                title: 'Architecture & DOCTYPE',
                duration: '1h',
                topics: ['Standards W3C', 'Structure Minimale', 'Balise Head'],
                lesson: {
                    title: 'L\'Anatomie du Document',
                    content: 'Le HTML5 commence par une déclaration de type. Le tag <head> contient tout ce qui ne se voit pas mais qui est crucial : titre, encodage, liens CSS.',
                    codeExample: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Ma Première Page</title>\n</head>...',
                    tips: ['Ne jamais oublier le viewport pour le mobile.', 'Le titre doit faire moins de 60 caractères.']
                }
            },
            {
                title: 'Typographie Sémantique',
                duration: '2h',
                topics: ['h1-h6', 'p', 'span vs div', 'emphasis'],
                lesson: {
                    title: 'Écrire pour le Web',
                    content: 'Utilisez les tags sémantiques. <strong> pour l\'importance, <em> pour l\'emphase. Un document bien structuré est lu plus facilement par Google.',
                    codeExample: '<section>\n  <h2>Points clés</h2>\n  <p>Ceci est un <strong>message important</strong>.</p>\n</section>',
                    tips: ['Un seul h1 par page.', 'H2 pour les sections principales.']
                }
            },
            {
                title: 'Formulaires Modernes',
                duration: '4h',
                topics: ['Input types', 'Select', 'Textarea', 'Labels', 'Validation'],
                lesson: {
                    title: 'Interaction Utilisateur',
                    content: 'Les formulaires permettent de récolter des données. Utilisez toujours <label> pour l\'accessibilité.',
                    codeExample: '<form>\n  <label for="email">Email:</label>\n  <input type="email" id="email" required placeholder="nom@exemple.com">\n  <button type="submit">Envoyer</button>\n</form>',
                    tips: ['Utilisez required pour une validation HTML de base.', 'Type="tel", type="email" changent le clavier sur mobile.']
                }
            },
            {
                title: 'Introduction au Design CSS',
                duration: '3h',
                topics: ['Sélecteurs de base', 'Classes vs IDs', 'Cascading theory'],
                lesson: {
                    title: 'La Peinture du Web',
                    content: 'Le CSS s\'applique en cascades. Les classes (.) sont réutilisables, les IDs (#) sont uniques.',
                    codeExample: '.blue-text {\n  color: #007bff;\n}\n\n#main-title {\n  font-size: 2.5rem;\n  text-transform: uppercase;\n}',
                    tips: ['Préférez les classes aux IDs pour le style.', 'Le dernier style écrit gagne (généralement).']
                }
            }
        ]
    },
    {
        level: 'Intermédiaire : Mise en Page',
        color: '#2ED9FF',
        duration: '6 semaines',
        modules: [
            {
                title: 'Le Box Model',
                duration: '2h',
                topics: ['Content', 'Padding', 'Border', 'Margin'],
                lesson: {
                    title: 'La Physique des Boîtes',
                    content: 'Tout en CSS est une boîte. box-sizing: border-box simplifie les calculs de taille en incluant le padding et la bordure dans la largeur définie.',
                    codeExample: '.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 10px;\n  box-sizing: border-box;\n}',
                    tips: ['Utilisez box-sizing: border-box globalement.', 'Padding = intérieur, Margin = extérieur.']
                }
            },
            {
                title: 'Flexbox Masterclass',
                duration: '5h',
                topics: ['Main Axis', 'Cross Axis', 'Flex Properties', 'Gap'],
                lesson: {
                    title: 'Mises en page 1D',
                    content: 'Flexbox gère l\'alignement sur un seul axe. Indispensable pour les barres de navigation et les centrages parfaits.',
                    codeExample: '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
                    tips: ['Justify-content aligne horizontalement (par défaut).', 'Align-items aligne verticalement (par défaut).']
                }
            },
            {
                title: 'CSS Grid System',
                duration: '6h',
                topics: ['Grid Areas', 'Fr Units', 'Implicit vs Explicit', 'Auto-fill'],
                lesson: {
                    title: 'Mises en page 2D',
                    content: 'Grid permet de définir des colonnes et des lignes. C\'est le système le plus puissant pour les structures globales de page.',
                    codeExample: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas: "sidebar main";\n}',
                    tips: ['Grid pour les colonnes, Flexbox pour le contenu des colonnes.', 'L\'unité fr est magique pour les proportions.']
                }
            },
            {
                title: 'Responsive & Media Queries',
                duration: '4h',
                topics: ['Breakpoints', 'Mobile-first strategy', 'Fluid units'],
                lesson: {
                    title: 'Adaptation Multi-écrans',
                    content: 'Utilisez @media pour changer le style selon la largeur de l\'écran. Commencez par le style mobile, puis ajoutez les styles pour desktop.',
                    codeExample: '@media (min-width: 768px) {\n  .container {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n}',
                    tips: ['Ne créez pas trop de breakpoints.', 'Utilisez rem pour les polices, %, vh ou vw pour les containers.']
                }
            }
        ]
    },
    {
        level: 'Pro : Animations & Architecture',
        color: '#FF2ECC',
        duration: '10 semaines',
        modules: [
            {
                title: 'Animations & Transitions',
                duration: '5h',
                topics: ['Keyframes', 'Timing Functions', 'Bezier Curves'],
                lesson: {
                    title: 'Donner Vie au Code',
                    content: 'Les animations rendent l\'interface plus humaine. Privilégiez transform (scale, rotate) au lieu de width/height pour la fluidité.',
                    codeExample: '@keyframes slideIn {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}\n.card:hover { transform: scale(1.05); }',
                    tips: ['Utilisez opacity et transform pour 60 FPS.', 'L\'animation doit servir l\'UX, pas distraire.']
                }
            }
        ]
    }
];

// ==========================================
// 2. JAVASCRIPT (ULTRA EXPANDED)
// ==========================================
export const javaScriptContent: CourseLevel[] = [
    {
        level: 'Débutant : Algorithmique',
        color: '#F7DF1E',
        duration: '4 semaines',
        modules: [
            {
                title: 'Variables & Logique',
                duration: '3h',
                topics: ['Memory allocation', 'Strict equality', 'Type conversion'],
                lesson: {
                    title: 'Penser comme une Machine',
                    content: 'Le code est une suite d\'instructions. Les variables sont les mémoires, les conditions sont les décisions.',
                    codeExample: 'const age = 20;\nconst major = age >= 18;\nif (major) { console.log("Success"); }',
                    tips: ['Toujours utiliser ===.', 'Privilégiez const.']
                }
            },
            {
                title: 'Tableaux & Itérations',
                duration: '4h',
                topics: ['Push/Pop', 'Slice/Splice', 'For vs While'],
                lesson: {
                    title: 'Gérer des Listes',
                    content: 'Les tableaux (Arrays) stockent des collections. On les parcourt souvent pour manipuler chaque élément.',
                    codeExample: 'const fruits = ["🍎", "🍌"];\nfruits.forEach(f => console.log(f));',
                    tips: ['forEach est plus moderne que la boucle for classique.', 'Les index commencent à 0.']
                }
            },
            {
                title: 'Fonctions & Portée',
                duration: '4h',
                topics: ['Parameters', 'Return values', 'Scope', 'Arrow functions'],
                lesson: {
                    title: 'Usines à Code',
                    content: 'Une fonction prend une entrée (input), fait un calcul et renvoie un résultat (output).',
                    codeExample: 'const add = (a, b) => a + b;\nconst total = add(5, 10);',
                    tips: ['Une fonction doit faire une seule chose.', 'Nommez vos fonctions avec un verbe (calculerTotal).']
                }
            }
        ]
    },
    {
        level: 'Intermédiaire : DOM & Asynchrone',
        color: '#FFB300',
        duration: '8 semaines',
        modules: [
            {
                title: 'DOM & Events',
                duration: '5h',
                topics: ['Events listeners', 'Bubbling', 'Manipulation'],
                lesson: {
                    title: 'Connecter le Script au HTML',
                    content: 'Le DOM est l\'interface qui permet à JS de modifier le HTML. Les événements permettent de réagir aux clics.',
                    codeExample: 'btn.addEventListener("click", () => {\n  document.body.style.backgroundColor = "red";\n});',
                    tips: ['Utilisez querySelector plutôt que getElementById.', 'Nettoyez vos listeners si nécessaire.']
                }
            },
            {
                title: 'Promises & Fetch API',
                duration: '6h',
                topics: ['API Calls', 'JSON Parsing', 'Async/Await'],
                lesson: {
                    title: 'Communiquer avec le Serveur',
                    content: 'JS est asynchrone par nature. Fetch permet d\'aller chercher des données sur le web sans bloquer la page.',
                    codeExample: 'const getData = async () => {\n  const res = await fetch("api.com/users");\n  const data = await res.json();\n};',
                    tips: ['Toujours utiliser try/catch avec async/await.', 'Inspectez les requêtes dans l\'onglet Network.']
                }
            }
        ]
    }
];

// ==========================================
// 3. PYTHON (ULTRA EXPANDED)
// ==========================================
export const pythonContent: CourseLevel[] = [
    {
        level: 'Débutant : Syntaxe Pure',
        color: '#3776AB',
        duration: '4 semaines',
        modules: [
            {
                title: 'Python Basics',
                duration: '2h',
                topics: ['Indentation syntax', 'F-strings', 'Dynamic typing'],
                lesson: {
                    title: 'L\'élégance du Serpent',
                    content: 'Python n\'utilise pas de crochets pour définir les blocs, mais l\'espace (indentation). C\'est ce qui rend le code lisible.',
                    codeExample: 'name = "Kimi"\nprint(f"Hello {name}")',
                    tips: ['Utilisez 4 espaces pour l\'indentation.', 'Python 3 est la norme.']
                }
            },
            {
                title: 'Logic Flow',
                duration: '4h',
                topics: ['Match-Case', 'Range', 'Enumerate'],
                lesson: {
                    title: 'Les carrefours logiques',
                    content: 'Contrôlez le flux de votre programme avec if, elif, else et les boucles for.',
                    codeExample: 'for i in range(5):\n    print(i)',
                    tips: ['Range(5) génère 0, 1, 2, 3, 4.', 'Enumerate donne l\'index et la valeur.']
                }
            }
        ]
    },
    {
        level: 'Intermédiaire : POO & Data',
        color: '#4B8BBE',
        duration: '8 semaines',
        modules: [
            {
                title: 'Programmation Objets',
                duration: '6h',
                topics: ['Classes', 'Init method', 'Self', 'Inheritance'],
                lesson: {
                    title: 'Architecturer avec des Objets',
                    content: 'La POO permet de modéliser le monde réel. Une classe est un patron, un objet est une instance de ce patron.',
                    codeExample: 'class User:\n    def __init__(self, name):\n        self.name = name',
                    tips: ['Self représente l\'objet lui-même.', 'Utilisez PascalCase pour les noms de classes.']
                }
            }
        ]
    }
];

// ==========================================
// 4. SQL (EXPANDED)
// ==========================================
export const sqlContent: CourseLevel[] = [
    {
        level: 'Débutant : Extraction',
        color: '#336791',
        duration: '4 semaines',
        modules: [
            {
                title: 'Modélisation Relationnelle',
                duration: '3h',
                topics: ['Table Schema', 'Primary Keys', 'Data Types'],
                lesson: {
                    title: 'Structurer l\'Information',
                    content: 'Une base de données relationnelle est comme un classeur avec des tiroirs (tables). Chaque tiroir a un format strict.',
                    codeExample: 'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username TEXT UNIQUE\n);',
                    tips: ['Pensez à l\'unicité des IDs.', 'Choisissez le bon type (TEXT, INT, DATE).']
                }
            },
            {
                title: 'Querying (Interroger)',
                duration: '4h',
                topics: ['SELECT', 'WHERE filtering', 'LIKE', 'IN', 'Null checks'],
                lesson: {
                    title: 'Parler aux données',
                    content: 'SQL est un langage déclaratif : vous dites ce que vous voulez, pas comment le faire.',
                    codeExample: 'SELECT * FROM products\nWHERE price < 50 AND stock > 0;',
                    tips: ['SQL n\'est pas sensible à la casse (généralement).', 'LIKE "%text%" est pratique pour la recherche floue.']
                }
            }
        ]
    }
];

// ==========================================
// 5. BASH / TERMINAL (EXPANDED)
// ==========================================
export const bashContent: CourseLevel[] = [
    {
        level: 'Débutant : Navigation',
        color: '#4EAA25',
        duration: '3 semaines',
        modules: [
            {
                title: 'Terminal Control',
                duration: '2h',
                topics: ['ls, cd, pwd', 'mkdir/rmdir', 'File manipulation'],
                lesson: {
                    title: 'Liberté sans Souris',
                    content: 'Le terminal vous permet d\'agir plus vite que n\'importe quelle interface graphique.',
                    codeExample: 'ls -la\npwd\ncd /var/www',
                    tips: ['TAB pour compléter les noms automatiquement.', 'CTRL+L pour effacer l\'écran.']
                }
            }
        ]
    }
];

// ==========================================
// 6. GO / GOLANG (EXPANDED)
// ==========================================
export const goContent: CourseLevel[] = [
    {
        level: 'Débutant : Simplicité',
        color: '#00ADD8',
        duration: '5 semaines',
        modules: [
            {
                title: 'Concepts Go',
                duration: '3h',
                topics: ['Static Typing', 'Packages', 'Implicit Interfaces'],
                lesson: {
                    title: 'Le Minimalisme de Google',
                    content: 'Go a été conçu pour être compilé rapidement et être facile à maintenir sur de gros projets.',
                    codeExample: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hi")\n}',
                    tips: ['Tout code doit être dans un package.', 'Les majuscules en début de fonction signifient "Public".']
                }
            }
        ]
    }
];

// ==========================================
// 7. CLEAN CODE & ARCHI (EXPANDED)
// ==========================================
export const cleanCodeContent: CourseLevel[] = [
    {
        level: 'Architecte Software',
        color: '#7B2D8E',
        duration: '8 semaines',
        modules: [
            {
                title: 'The Naming Art',
                duration: '3h',
                topics: ['Intentional names', 'Pronounceable names', 'Context'],
                lesson: {
                    title: 'Nommer pour l\'Avenir',
                    content: 'Le code est lu 10x plus qu\'il n\'est écrit. Un bon nom rend les commentaires inutiles.',
                    codeExample: '// Bad: d = 86400\n// Good: SECONDS_PER_DAY = 86400',
                    tips: ['Évitez les noms de variables à une seule lettre.', 'Nommez les fonctions par des actions.']
                }
            },
            {
                title: 'SOLID Principles',
                duration: '10h',
                topics: ['SRP', 'OCP', 'LSP', 'ISP', 'DIP'],
                lesson: {
                    title: 'Architecture Robuste',
                    content: 'SOLID est l\'acronyme des 5 principes qui rendent votre code maintenable et extensible.',
                    codeExample: '// SRP: Une classe = Une seule responsabilité',
                    tips: ['N\'essayez pas de tout appliquer d\'un coup.', 'L\'abstraction prématurée est le diable.']
                }
            }
        ]
    }
];

export const reactContent: CourseLevel[] = [
    {
        level: 'Débutant : UI Déclarative',
        color: '#61DAFB',
        duration: '4 semaines',
        modules: [
            {
                title: 'L\'État (State)',
                duration: '3h',
                topics: ['useState hook', 'Immutability', 'Updates'],
                lesson: {
                    title: 'Rendre la Page Réactive',
                    content: 'En React, on ne modifie pas le DOM. On modifie l\'état, et React s\'occupe du reste.',
                    codeExample: 'const [score, setScore] = useState(0);',
                    tips: ['Ne muter jamais l\'état directement (pas de arr.push).', 'L\'état doit être le plus simple possible.']
                }
            }
        ]
    },
    {
        level: 'Avancé : Performance & Context',
        color: '#FFD43B',
        duration: '6 semaines',
        modules: [
            {
                title: 'Context API Masterclass',
                duration: '4h',
                topics: ['Provider', 'Consumer', 'useContext hook', 'State Management'],
                lesson: {
                    title: 'Éviter le Prop Drilling',
                    content: 'Context permet de partager des données entre plusieurs composants sans avoir à passer les props manuellement à chaque niveau.',
                    codeExample: 'const ThemeContext = createContext("dark");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="light">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}',
                    tips: ['N\'utilisez Context que quand c\'est nécessaire.', 'Pour des états complexes, utilisez un Reducer avec Context.']
                }
            },
            {
                title: 'Optimisation avec Memo',
                duration: '3h',
                topics: ['useMemo', 'useCallback', 'React.memo'],
                lesson: {
                    title: 'Maitriser les Rerenders',
                    content: 'React est rapide, mais parfois on veut éviter des calculs ou des rendus inutiles. useMemo met en cache une valeur, useCallback met en cache une fonction.',
                    codeExample: 'const cachedValue = useMemo(() => compute(a), [a]);',
                    tips: ['N\'optimisez pas prématurément.', 'Mesurez d\'abord avec le React DevTools Profiler.']
                }
            }
        ]
    }
];

// ==========================================
// 9. NODE.JS / BACKEND (EXPANDED)
// ==========================================
export const nodeContent: CourseLevel[] = [
    {
        level: 'Débutant : API Design',
        color: '#339933',
        duration: '4 semaines',
        modules: [
            {
                title: 'Middleware Concept',
                duration: '3h',
                topics: ['Pipeline', 'Auth middleware', 'Logging'],
                lesson: {
                    title: 'Intercepter les requêtes',
                    content: 'Les middlewares sont des fonctions qui s\'exécutent dans l\'ordre avant d\'arriver à votre route finale.',
                    codeExample: 'app.use((req, res, next) => {\n  console.log("Log");\n  next();\n});',
                    tips: ['N\'oubliez jamais next() !', 'Ordre des middlewares = Ordre d\'exécution.']
                }
            }
        ]
    },
    {
        level: 'Pro : Scalabilité & DB',
        color: '#FF6B35',
        duration: '8 semaines',
        modules: [
            {
                title: 'Architecture MVC / Hexa',
                duration: '5h',
                topics: ['Controllers', 'Services', 'Repositories', 'DTOs'],
                lesson: {
                    title: 'Organiser un Projet Large',
                    content: 'Ne mettez pas tout votre code dans app.js. Séparez la logique de routage de la logique métier.',
                    codeExample: '// Controller calls Service which calls Repository',
                    tips: ['Gardez les routeurs fins.', 'La logique métier doit être indépendante du framework.']
                }
            },
            {
                title: 'Authentification JWT',
                duration: '6h',
                topics: ['JWT', 'Bcrypt', 'Cookies vs Headers', 'Refresh Tokens'],
                lesson: {
                    title: 'Sécuriser son API',
                    content: 'JWT (JSON Web Token) est le standard pour l\'authentification sans état dans les APIs REST.',
                    codeExample: 'const token = jwt.sign({ id: user.id }, secret);',
                    tips: ['Ne stockez jamais les mots de passe en clair (utilisez bcrypt).', 'L\'access token doit être court, le refresh token long.']
                }
            }
        ]
    }
];

// ==========================================
// 10. GIT & TOOLS (EXPANDED)
// ==========================================
export const gitTsContent: CourseLevel[] = [
    {
        level: 'Débutant : Safety First',
        color: '#3178C6',
        duration: '4 semaines',
        modules: [
            {
                title: 'Generic Types',
                duration: '4h',
                topics: ['Reusable logic', 'T placeholder', 'Constraints'],
                lesson: {
                    title: 'Coder sans se répéter',
                    content: 'Les Generics vous permettent de créer des fonctions ou classes qui travaillent avec n\'importe quel type tout en restant sécurisées.',
                    codeExample: 'function getFirst<T>(arr: T[]): T {\n  return arr[0];\n}',
                    tips: ['Utilisez T comme nom conventionnel.', 'Idéal pour les APIs et les collections.']
                }
            }
        ]
    }
];
