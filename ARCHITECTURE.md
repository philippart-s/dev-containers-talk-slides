# Architecture — decks SliDesk multilingues et gabarit commun

Ce document fixe les choix faits avant d'écrire le moindre fichier de deck : où vit chaque chose, comment elle s'appelle, comment on change de langue, ce qui est commun à tous les talks et ce qui est propre à un talk.

SliDesk ≥ 2.22.3. Les comportements cités ont été vérifiés dans les sources de SliDesk (`src/core/babelfish/*`) et par des essais (voir « Vérifications faites »).

## 1. Deux dépôts

| Dépôt | Rôle | Emplacement |
|---|---|---|
| `slidesk-theme-wildagsx` | gabarit commun à **tous** les talks : thème, polices, footer, template photo, slides récurrentes, images partagées, traduction | `~/Developments/slidesk-theme-wildagsx` (privé) |
| `dev-containers-talk-slides` | ce talk : contenu, traductions, images propres au talk | ce dépôt |

Le gabarit est un **thème SliDesk**. Un thème `themes/<nom>/` est chargé automatiquement par SliDesk avec tout ce qu'il contient : ses `*.css` et `*.js` (récursivement), ses templates `*.sdt`, ses `plugins/` et ses `components/`. C'est le mécanisme d'extension prévu par SliDesk : rien n'est ajouté au cœur ni aux addons `@gouz__*`.

Chaque deck monte le thème en **sous-module git** dans `deck/themes/wildagsx/` :

```bash
git submodule add <url-du-repo-theme> deck/themes/wildagsx   # une fois par deck
git submodule update --remote deck/themes/wildagsx           # récupérer la dernière version du gabarit
```

Options écartées :
- hub slidesk.link (`slidesk theme push/install`) : le téléchargement se fait sans authentification, donc l'addon est public ;
- `COMMON_DIR` : partage les plugins et les assets, mais pas les templates `.sdt` (le template photo devrait être recopié dans chaque deck).

## 2. Arborescences

### Gabarit (`slidesk-theme-wildagsx/` = `deck/themes/wildagsx/`)

```
README.md                 # mode d'emploi complet
theme.css                 # variables --sd-* et --wx-*, polices, classes de slides, surcharges @gouz
fonts/Amatic_SC/, fonts/Montserrat/
footer.css                # style du footer (pas dans le plugin : voir §9, point 8)
plugins/footer/           # plugin.json, footer.html
templates/photo/          # photo.sdt, photo.css, photo.js (intercalaire plein écran)
templates/cover/          # cover.sdt, cover.css (fond et logo de conférence optionnels)
components/i18n.mjs       # traduction des notes speaker et des clés communes (voir §4)
i18n/fr.json, i18n/en.json  # textes des slides récurrentes (clés common_*)
slides/                   # slides récurrentes, à inclure depuis le deck
  merci.md, speaker.md, ovhcloud.md, thanks.md
assets/                   # images partagées : logos OVHcloud, coeur.jpg, speaker/, thanks/, link.png
```

Contrainte : SliDesk injecte dans la page **tous** les `*.js` et `*.css` du dossier `themes/`. Le dépôt du thème ne contient donc aucun `.js` ou `.css` qui ne soit pas destiné au navigateur (pas d'outillage en `.js` à la racine). Le composant est en `.mjs`, donc non injecté.

### Deck (`dev-containers-talk-slides/`)

```
ARCHITECTURE.md, README.md, CLAUDE.md
deck/
├── main.md               # uniquement : saut de ligne + !include(slides)
├── slidesk.toml          # titre, largeur, variables ++…++ de l'édition
├── fr.lang.json          # "default": true — tous les textes FR du talk
├── en.lang.json          # tous les textes EN du talk
├── slides/00-cover.md … slides/16-merci.md
├── themes/wildagsx/      # sous-module git (gabarit)
├── plugins/@gouz__steps, @gouz__qrcode, @gouz__number, @gouz__progress   # hub, jamais modifiés
├── templates/@gouz__split                                               # hub, jamais modifié
└── assets/images/        # propre au talk : conf-logo.svg, photos/, schemas/
```

## 3. Nommage

- **Slides** : `slides/NN-slug.md`, numérotées à partir de `00`, une slide par fichier, slug en français court (`03-cycle-de-vie.md`). La couverture est `00-cover.md` ; `main.md` ne contient plus de slide.
- **Slide récurrente** : un fichier du deck qui inclut celle du thème, pour garder la numérotation :
  ```markdown

  !include(../themes/wildagsx/slides/merci.md)
  ```
  Le chemin est relatif au fichier qui inclut. La ligne vide avant `!include` est obligatoire : SliDesk ne reconnaît la directive qu'après un saut de ligne.
- **Clés de traduction** : `<slug>_<rôle>`, sans numéro, pour survivre à un réordonnancement : `cycle_title`, `cycle_1` … `cycle_7`, `cycle_notes`. Clés du gabarit : préfixe `common_` (`common_thanks_title`). Dans les `.lang.json`, les clés suivent l'ordre des slides.
- **Variables d'édition** (`slidesk.toml`, `++CLÉ++`) : majuscules, `CONF_NAME`, `SLIDES_URL`, `FEEDBACK_URL`, `SOURCE_URL`.
- **Classes CSS** : classes de slide en minuscules (`slide-text`, `schema`, `quote`) ; variables propres au gabarit préfixées `--wx-`.
- **Images** : `assets/images/<catégorie>/<slug>.<ext>` ; une photo = un crédit dans la slide.

## 4. Multilingue

### Ce que fait SliDesk seul
`fr.lang.json` / `en.lang.json` à la racine du deck, `$$clé$$` dans les slides, `slidesk -l en`. Sans `-l`, le fichier marqué `"default": true` est utilisé.

```json
{ "default": true, "translations": { "cycle_title": "👩‍💻 Le cycle de vie d'un poste de dév 👨‍💻" } }
```

### Deux limites constatées
1. **Les notes speaker ne sont pas traduites** : SliDesk encode les notes `/* … */` (en base64) avant de remplacer les `$$clé$$`. Un `$$cycle_notes$$` reste tel quel dans la vue speaker.
2. **Un seul fichier par langue, à la racine du deck** : les textes des slides récurrentes du gabarit devraient être recopiés dans chaque deck.

### Solution retenue : composant `components/i18n.mjs` du thème
Les composants sont le point d'extension de SliDesk pour transformer la présentation au moment de la construction. Celui du thème, exécuté avant la traduction native :
- lit la langue demandée (`-l` / `--lang` de la ligne de commande, sinon le fichier `"default": true`) ;
- fusionne `themes/wildagsx/i18n/<lang>.json` (clés `common_*`) et `deck/<lang>.lang.json` (le deck a priorité) ;
- remplace les `$$clé$$` dans les slides **et** dans les notes (décodées, traduites, ré-encodées) ;
- signale les clés manquantes dans la console ; une clé absente reste visible `$$clé$$` sur la slide.

Effet de bord utile : le composant passe avant le rendu markdown, donc le markdown d'une valeur est interprété (`**gras**`, `*italique*`, liens).

Point de fragilité : SliDesk ne transmet pas la langue aux composants ; le composant la lit dans `process.argv`. Si SliDesk traduit un jour les notes ou transmet la langue, le composant se simplifie ou disparaît sans toucher aux slides ni aux `.lang.json` (même format). Une demande d'évolution à SliDesk est possible (à décider par Stéphane).

### Écrire une slide
```markdown
## $$cycle_title$$ .[slide-text]

- $$cycle_1$$
- $$cycle_2$$

/*
//@ < 02:30

$$cycle_notes$$
*/
```
Le checkpoint `//@ < mm:ss` reste dans le `.md` (commun aux deux langues). Notes sur plusieurs paragraphes : `\n\n` dans la valeur JSON.

### Lancer
```bash
cd deck
slidesk -n -o            # FR (langue par défaut)
slidesk -n -o -l en      # EN
slidesk save -l en -t ../public/en
```

## 5. CSS

Un seul `theme.css` dans le gabarit. Rien de spécifique à un talk n'y entre ; un deck qui a besoin d'un style propre l'ajoute dans un thème local `deck/themes/<talk>/theme.css`, chargé lui aussi automatiquement.

### Variables
Variables SliDesk (`--sd-*`) réglées par le gabarit : tailles h1/h2/texte, couleurs fond/texte/titres/primaire.

Variables propres (`--wx-*`), seul endroit où changer le look :

| Variable | Valeur | Usage |
|---|---|---|
| `--wx-font-title` | `Amatic` | titres h1/h2/h3 |
| `--wx-font-text` | `Montserrat` | texte, footer, numéro |
| `--wx-color-text` | `#000` | texte sur fond clair |
| `--wx-color-on-dark` | `#fff` | footer, numéro, crédit sur slide `dark` |
| `--wx-color-primary` | `#0097a7` | liens, `@wildagsx` |
| `--wx-margin-x` | `3vw` | marge gauche des titres et contenus |
| `--wx-list-size` | `2vw` | taille des listes `slide-text` |
| `--wx-footer-bottom` / `--wx-footer-height` / `--wx-footer-size` | `1.5vh` / `4vh` / `.9vw` | footer |

### Classes de slide (gabarit)
| Classe | Usage | Pages du PDF |
|---|---|---|
| `#cover` (template du gabarit) | couverture ; blocs optionnels `[[bg]]` (visuel de la conférence en fond) et `[[logo]]` (logo de la conférence centré, pleine page) ; sans bloc : fond blanc | 1 |
| `#photo` + `dark` `light` `stretch` `title-right` `title-left` | intercalaire plein écran avec crédit | 2, 3, 11 |
| `slide-text` | titre à gauche, liste à emoji sans puce | 4, 5, 6, 9, 10, 12, 13, 14, 16 |
| `quote` (nouvelle) | citation centrée en police de titre, barré possible (`~~Ring~~`) | 7 |
| `schema` | une image sous le titre | 8, 15 |
| `table`, `cards` | tableaux, cartes (repris tels quels) | — |
| `#split thanks` (template `@gouz/split`) | fin avec QR codes | 17 |

Surcharges des addons du hub (`footer#numslide`, `div#sd-progress`) : dans `theme.css`, jamais dans `@gouz__*`.

## 6. Look : PDF d'origine ↔ gabarit actuel

| Élément | PDF (JUG SummerCamp) | Gabarit actuel (ai-ram-gpu) | Proposition |
|---|---|---|---|
| Titres | Amatic, emoji de part et d'autre, en haut à gauche | Amatic, à gauche | identique, emojis dans le texte |
| Listes | Montserrat, emoji en tête, sans puce | `slide-text` | identique |
| Footer | @wildagsx (avec avatar) à gauche, OVHcloud au centre, logo conf rond à droite | logo conf à gauche, OVHcloud au centre, @wildagsx à droite | **OVHcloud à gauche, logo conf au centre, @wildagsx à droite** (décidé) |
| Numéro de slide | absent | en haut à gauche (`@gouz/number`) | garder |
| Couverture | visuel de la conférence en fond, titre + « Speaker : … » | fond blanc, titre, logo conf dessous | template `#cover` : fond optionnel `[[bg]]` (souvent absent → fond blanc), logo de la conf centré pleine page optionnel `[[logo]]` ; quand ce logo est affiché, le logo conf du footer est masqué sur cette slide (décidé) |
| Slide OVHcloud | carte des datacenters | absente | slide récurrente du gabarit |
| Fin | 3 QR codes (Slides, Feedback, Source code) + minions | 2 QR codes + minions | 3 QR codes, URLs depuis `slidesk.toml` |

## 7. Commun ou propre au talk

| Commun (gabarit) | Propre au talk (deck) |
|---|---|
| polices, `theme.css`, variables | `slidesk.toml` (titre, variables d'édition) |
| footer, template photo, composant i18n | `fr.lang.json`, `en.lang.json` |
| slides merci, speaker, ovhcloud, thanks | slides du talk |
| logos OVHcloud, coeur.jpg, photos speaker, minions, link.png | `conf-logo.svg`, visuel de couverture, photos et schémas du talk |
| textes `common_*` FR/EN | — |

Les slides récurrentes sont paramétrées par `slidesk.toml` (`++SLIDES_URL++`, `++FEEDBACK_URL++`, `++SOURCE_URL++`) : aucun texte du gabarit n'est à recopier.

## 8. Branches et commits

Branches courtes, une par étape, fusionnées avant la suivante. Commits atomiques au format `type: emoji sujet`, proposés puis faits sous l'identité de Stéphane après accord. Jamais de push par Claude.

| # | Dépôt | Branche | Contenu |
|---|---|---|---|
| 0 | talk | `docs/00-architecture` | ce document |
| 1 | thème | `feat/01-theme-base` | polices, `theme.css`, README |
| 2 | thème | `feat/02-footer` | plugin footer (OVHcloud / logo conf / @wildagsx) |
| 3 | thème | `feat/03-templates` | templates `photo` et `cover` (logo conf du footer masqué quand la couverture affiche le logo) |
| 4 | thème | `feat/04-i18n-common-slides` | composant i18n, `i18n/`, slides récurrentes, assets |
| 5 | talk | `feat/05-deck-skeleton` | sous-module, addons hub, toml, lang.json, 00-cover, 01-merci, CLAUDE.md |
| 6 | talk | `feat/06-slides-problem` | 02 à 06 |
| 7 | talk | `feat/07-slides-devcontainers` | 07 à 10 |
| 8 | talk | `feat/08-slides-review` | 11, 12 |
| 9 | talk | `feat/09-slides-end` | 13 à 16 |
| 10 | les deux | `docs/10-readme` | README finaux |

## 9. Ce qui ne fonctionne pas tel quel dans SliDesk (2.22.3)

Version détaillée, rédigée pour le créateur de SliDesk : [`SLIDESK-FEEDBACK.md`](SLIDESK-FEEDBACK.md). Ici : le constat court, si ce deck en dépend, et le contournement retenu.

| # | Constat | Pour ce deck | Contournement |
|---|---|---|---|
| 1 | **Les notes speaker ne sont pas traduites** : les notes `/* … */` sont encodées (base64) avant le remplacement des `$$clé$$`. | **nécessaire** (tout le script passe par des clés) | composant `i18n.mjs` du thème |
| 2 | **Le formatage markdown à l'intérieur d'une valeur n'est pas interprété** : la traduction a lieu après le rendu markdown. Une clé *entourée* de formatage fonctionne (`**$$k$$**`, `*$$k$$*`, `` `$$k$$` ``, `[$$k$$](url)`). | **nécessaire** (phrases avec code inline, liens, mises en évidence, dans les slides et le script) | composant `i18n.mjs` (traduit avant le rendu markdown) |
| 3 | **Un seul fichier de langue, à la racine du deck** : un thème ne peut pas fournir ses propres traductions. | **nécessaire** (slides récurrentes du gabarit) | `themes/wildagsx/i18n/<lang>.json` lu par le composant |
| 4 | **La langue choisie n'est pas transmise aux composants** (ni exposée dans `window.slidesk`). | utile (nécessaire seulement à cause du contournement) | le composant lit `-l` / `--lang` dans `process.argv` (fragile) |
| 5 | **`!include(...)` en première ligne d'un fichier est ignoré** : la directive n'est reconnue qu'après un saut de ligne ; la ligne s'affiche comme titre de slide. | gênant | ligne vide en tête de fichier |
| 8 | **La CSS d'un plugin de thème est référencée par un chemin absolu** (`/themes/…`) : casse en `file://` et sous un sous-chemin. | gênant (footer) | style du footer en feuille du thème (`footer.css`), le plugin ne garde que le HTML |
| 6 | **`COMMON_DIR` ne charge pas les templates `.sdt`** (seulement plugins et assets). | non | gabarit en thème, monté en sous-module |
| 7 | **Pas d'addon privé sur le hub** : `theme install` télécharge sans authentification, donc tout addon poussé est public. | non | sous-module git |

## 10. Vérifications faites (SliDesk 2.22.3)

- `$$clé$$` dans une slide : traduit en FR et EN, y compris entouré de formatage ; le markdown *dans* une valeur n'est **pas** interprété par la traduction native.
- `$$clé$$` dans une note `/* */` : **non** traduit par SliDesk.
- Composant de thème `components/i18n.mjs` : notes traduites, clés `common_*` lues dans le thème, markdown des valeurs interprété ; langue correcte avec `save -l fr`, `save -l en`, sans `-l` (défaut FR) et avec `present -l en`.
- Un `main.md` qui commence par `!include(...)` sans ligne vide avant n'inclut rien.

## 11. Vérifier un deck

```bash
cd deck
slidesk save -l fr -t "$TMP/out-fr" "$PWD"
slidesk save -l en -t "$TMP/out-en" "$PWD"
```
Servir chaque dossier en HTTP, capturer chaque slide en Chromium headless 1920×1200 (`…/index.html#N`), comparer au PDF d'origine. Avant tout commit : `git diff -- 'deck/plugins/@gouz__*' 'deck/templates/@gouz__*'` doit être vide.
