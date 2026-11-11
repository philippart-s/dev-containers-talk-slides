# Architecture — decks SliDesk multilingues et gabarit commun

Ce document fixe les choix faits avant d'écrire le moindre fichier de deck : où vit chaque chose, comment elle s'appelle, comment on change de langue, ce qui est commun à tous les talks et ce qui est propre à un talk.

SliDesk ≥ 2.23.0. Les comportements cités ont été vérifiés dans les sources de SliDesk et par des essais (voir « Vérifications faites »).

## 1. Deux dépôts

| Dépôt | Rôle | Emplacement |
|---|---|---|
| `slidesk-theme-wildagsx` | gabarit commun à **tous** les talks : thème, polices, footer, templates, slides récurrentes, images partagées, traductions communes | `~/Developments/slidesk-theme-wildagsx` (privé) |
| `dev-containers-talk-slides` | ce talk : contenu, traductions, images propres au talk | ce dépôt |

Le gabarit est un **thème SliDesk**. Un thème `themes/<nom>/` est chargé automatiquement avec tout ce qu'il contient : ses `*.css` et `*.js` (récursivement), ses templates `*.sdt`, ses `plugins/`, ses `components/` et ses fichiers de langue `XX.lang.json`. C'est le mécanisme d'extension prévu par SliDesk : rien n'est ajouté au cœur ni aux addons `@gouz__*`.

Chaque deck installe le thème depuis son dépôt git privé (SliDesk ≥ 2.23.0) :

```bash
cd deck
slidesk theme install <url-git>/slidesk-theme-wildagsx.git   # installé dans themes/slidesk-theme-wildagsx/
slidesk theme update slidesk-theme-wildagsx                  # ou slidesk update : dernière version
```

- Le thème est installé sous le **nom du dépôt** : tous les chemins des decks disent `themes/slidesk-theme-wildagsx/`.
- Le clone garde son `.git` ; il est exclu du dépôt du talk (`.gitignore`) et réinstallé après un `git clone` du talk.
- Pas de version figée : la mise à jour prend le dernier commit de la branche par défaut et écrase les modifications locales. Avant une conférence, ne pas mettre à jour.
- Développer le gabarit sans pousser : cloner la branche du dépôt local dans `deck/themes/slidesk-theme-wildagsx/` (procédure dans le README du thème, §6).

Options écartées :
- sous-module git : fonctionne, mais ce n'est pas l'outil SliDesk ; choix de Stéphane pour `theme install` ;
- hub slidesk.link : un addon poussé est public ;
- `COMMON_DIR` : partage les plugins et les assets, mais pas les templates `.sdt`.

## 2. Arborescences

### Gabarit (`slidesk-theme-wildagsx/` = `deck/themes/slidesk-theme-wildagsx/`)

```
theme.json                # marqueur exigé par `slidesk theme install`
README.md                 # mode d'emploi complet
theme.css                 # variables --sd-* et --wx-*, polices, classes de slides, surcharges @gouz
footer.css                # style du footer (pas dans le plugin : voir §9, point 8)
plugins/footer/           # plugin.json, footer.html
templates/cover/          # cover.sdt, cover.css (fond et logo de conférence optionnels)
templates/photo/          # photo.sdt, photo.css (intercalaire plein écran)
templates/background.js   # image d'un bloc → fond de slide (cover et photo)
fr.lang.json, en.lang.json  # textes communs (clés common_*) et clé lang
slides/                   # slides récurrentes, à inclure depuis le deck
fonts/Amatic_SC/, fonts/Montserrat/
assets/images/            # logos OVHcloud, badge de logo conf, carte OVHcloud FR/EN, photos et images partagées
```

Contrainte : SliDesk injecte dans la page **tous** les `*.js` et `*.css` du dossier `themes/`. Le dépôt du thème ne contient aucun `.js` ou `.css` qui ne soit pas destiné au navigateur.

Les images utilisées par les CSS du thème (footer) sont des `url()` relatives à la feuille : elles marchent quel que soit le nom du dossier du thème.

### Deck (`dev-containers-talk-slides/`)

```
ARCHITECTURE.md, SLIDESK-FEEDBACK.md, README.md, CLAUDE.md
.gitignore                # deck/themes/slidesk-theme-wildagsx/
deck/
├── main.md               # uniquement : saut de ligne + !include(slides)
├── slidesk.toml          # titre, largeur, variables ++…++ de l'édition
├── fr.lang.json          # "default": true — tous les textes FR du talk
├── en.lang.json          # tous les textes EN du talk
├── slides/00-cover.md … slides/16-merci.md
├── themes/slidesk-theme-wildagsx/   # installé par slidesk theme install, non versionné ici
├── plugins/@gouz__steps, @gouz__qrcode, @gouz__number, @gouz__progress   # hub, jamais modifiés
├── templates/@gouz__split                                               # hub, jamais modifié
└── assets/images/        # propre au talk : conf-logo.svg, photos/, schemas/
```

## 3. Nommage

- **Slides** : `slides/NN-slug.md`, numérotées à partir de `00`, une slide par fichier, slug en français court (`03-cycle-de-vie.md`). La couverture est `00-cover.md` ; `main.md` ne contient pas de slide.
- **Slide récurrente** : un fichier du deck qui inclut celle du thème, pour garder la numérotation ; le deck peut y ajouter ses notes après l'include :
  ```markdown

  !include(../themes/slidesk-theme-wildagsx/slides/ovhcloud.md)

  /*
  $$ovhcloud_notes$$
  */
  ```
  Le chemin est relatif au fichier qui inclut. La ligne vide avant `!include` est obligatoire (§9, point 5).
- **Clés de traduction** : `<slug>_<rôle>`, sans numéro, pour survivre à un réordonnancement : `cycle_title`, `cycle_1` … `cycle_7`, `cycle_notes`. Clés du gabarit : préfixe `common_` (`common_thanks_title`). Dans les `.lang.json`, les clés suivent l'ordre des slides.
- **Variables d'édition** (`slidesk.toml`, `++CLÉ++`) : majuscules, `CONF_NAME`, `SLIDES_URL`, `FEEDBACK_URL`, `SOURCE_URL`. Elles vont **à la racine** du fichier, au-dessus de `[slidesk]` (§9, point 11).
- **Classes CSS** : classes de slide en minuscules (`slide-text`, `schema`, `quote`) ; variables propres au gabarit préfixées `--wx-`.
- **Images** : `assets/images/<catégorie>/<slug>.<ext>`, sans espace ; une photo = un crédit dans la slide. Image par langue : suffixe `-fr` / `-en` et clé `$$lang$$` dans le chemin.

## 4. Multilingue (natif, SliDesk ≥ 2.23.0)

- `fr.lang.json` (`"default": true`) et `en.lang.json` à la racine du deck ; `$$clé$$` dans les slides **et les notes** ; `slidesk -l en`.
- Le thème a ses propres `fr.lang.json` / `en.lang.json` (clés `common_*` et `lang`) ; le deck l'emporte sur une clé du thème.
- Une valeur est rendue en **markdown en ligne** : gras, italique, code, liens. Une phrase = une clé, formatage compris (l'ordre des mots change d'une langue à l'autre). Une valeur qui deviendrait une liste, un titre ou plusieurs paragraphes est insérée telle quelle : une note longue = plusieurs clés, une par paragraphe.
- `$$lang$$` (fournie par le thème) vaut `fr` ou `en` : pour les images par langue.

```json
{ "default": true, "translations": { "cycle_title": "👩‍💻 Le cycle de vie d'un poste de dév 👨‍💻" } }
```

### Écrire une slide
```markdown
## $$cycle_title$$ .[slide-text]

- $$cycle_1$$
- $$cycle_2$$

/*
//@ < 02:30

$$cycle_notes_1$$

$$cycle_notes_2$$
*/
```
Le checkpoint `//@ < mm:ss` reste dans le `.md` (commun aux deux langues).

### Lancer
```bash
cd deck
slidesk -n -o            # FR (langue par défaut)
slidesk -n -o -l en      # EN
slidesk save -l en -t ../public/en
```

## 5. CSS

Un seul `theme.css` dans le gabarit (plus `footer.css` et les CSS des templates). Rien de spécifique à un talk n'y entre ; un deck qui a besoin d'un style propre l'ajoute dans un thème local `deck/themes/<talk>/theme.css`, chargé lui aussi automatiquement, avec `:root:root { --wx-… }` pour surcharger une variable. Liste complète des variables et des classes : README du thème.

### Classes de slide (gabarit) et pages du PDF
| Classe | Usage | Pages du PDF |
|---|---|---|
| `#cover` | couverture : titre, logo de conf optionnel `[[logo]]` dessous (masque celui du footer), fond optionnel `[[bg]]` | 1 |
| `#photo` + `dark` `light` `stretch` `title-right` `title-left` | intercalaire plein écran avec crédit | 2, 3, 11 |
| `slide-text` | titre à gauche, liste à emoji sans puce | 4, 5, 6, 9, 10, 12, 13, 14, 16 |
| `quote` | citation centrée en police de titre, titre masqué, barré possible (`~~Ring~~`) | 7 |
| `schema` | une image sous le titre | 8, 15 |
| `table`, `cards` | tableaux, cartes | — |

Surcharges des addons du hub (`footer#numslide`, `div#sd-progress`) : dans `theme.css`, jamais dans `@gouz__*`.

## 6. Look : PDF d'origine ↔ gabarit

| Élément | PDF (JUG SummerCamp) | Gabarit |
|---|---|---|
| Titres | Amatic, emoji de part et d'autre, en haut à gauche | identique, emojis dans le texte |
| Listes | Montserrat, emoji en tête, sans puce | `slide-text` |
| Footer | @wildagsx à gauche, OVHcloud au centre, logo conf à droite | **OVHcloud à gauche, logo conf au centre, @wildagsx à droite** (décidé) |
| Numéro de slide | absent | en haut à gauche (`@gouz/number`) |
| Couverture | visuel de la conférence en fond, titre + « Speaker : … » | `#cover` : titre un peu au-dessus du milieu, logo de conf dessous (optionnel), fond optionnel (décidé) |
| Slide OVHcloud | carte des datacenters | slide récurrente du gabarit, carte FR ou EN selon la langue |
| Fin | 3 QR codes (Slides, Feedback, Source code) + minions | 3 QR codes, URLs depuis `slidesk.toml` |

## 7. Commun ou propre au talk

| Commun (gabarit) | Propre au talk (deck) |
|---|---|
| polices, `theme.css`, variables | `slidesk.toml` (titre, variables d'édition) |
| footer, templates cover et photo | `fr.lang.json`, `en.lang.json` |
| slides merci, speaker, ovhcloud, fin | slides du talk, notes des slides récurrentes |
| logos OVHcloud, carte OVHcloud FR/EN, coeur.jpg, photos speaker, minions, link.png | `conf-logo.svg`, visuel de couverture, photos et schémas du talk |
| textes `common_*` FR/EN | — |

Les slides récurrentes sont paramétrées par `slidesk.toml` (`++SLIDES_URL++`, `++FEEDBACK_URL++`, `++SOURCE_URL++`) et traduites par les fichiers de langue du thème : aucun texte du gabarit n'est à recopier.

## 8. Branches et commits

Branches courtes, une par étape, fusionnées dans `main` avant la suivante. Commits atomiques au format `type: emoji sujet`, proposés puis faits sous l'identité de Stéphane après accord. Jamais de push par Claude.

| # | Dépôt | Branche | Contenu | État |
|---|---|---|---|---|
| 0 | talk | `docs/00-architecture` | ce document, retours SliDesk | fait |
| 1 | thème | `feat/01-theme-base` | polices, `theme.css`, README | fait |
| 2 | thème | `feat/02-footer` | footer OVHcloud / logo conf / @wildagsx | fait |
| 3 | thème | `feat/03-templates` | templates `photo` et `cover` | fait |
| 4a | thème + talk | `feat/04-git-install`, `docs/04-slidesk-2.23` | `theme.json`, footer indépendant du nom de dossier, doc SliDesk 2.23 | en cours |
| 4b | thème | `feat/04-common-slides` | langues du thème, slides récurrentes, assets | |
| 5 | talk | `feat/05-deck-skeleton` | install du thème, addons hub, toml, lang.json, 00-cover, 01-merci, CLAUDE.md | |
| 6 | talk | `feat/06-slides-problem` | 02 à 06 | |
| 7 | talk | `feat/07-slides-devcontainers` | 07 à 10 | |
| 8 | talk | `feat/08-slides-review` | 11, 12 | |
| 9 | talk | `feat/09-slides-end` | 13 à 16 | |
| 10 | les deux | `docs/10-readme` | README finaux | |

## 9. Limites de SliDesk

Version détaillée, rédigée pour le créateur de SliDesk : [`SLIDESK-FEEDBACK.md`](SLIDESK-FEEDBACK.md).

| # | Constat | État | Contournement éventuel |
|---|---|---|---|
| 1 | Notes speaker non traduites | **réglé en 2.23.0** | — |
| 2 | Markdown dans une valeur non interprété | **réglé en 2.23.0** (markdown en ligne) | une note longue = une clé par paragraphe |
| 3 | Un thème ne peut pas fournir ses traductions | **réglé en 2.23.0** | — |
| 4 | Langue non transmise aux composants | sans objet (plus de composant) | — |
| 5 | `!include(...)` en première ligne d'un fichier ignoré, sans message | ouvert, gênant | ligne vide en tête de fichier |
| 6 | `COMMON_DIR` ne charge pas les templates `.sdt` | ouvert, non nécessaire | thème installé par git |
| 7 | Pas d'addon privé sur le hub | **réglé en 2.23.0** par l'installation depuis git | — |
| 8 | CSS d'un plugin de thème référencée en chemin absolu (`/themes/…`) | ouvert, gênant | style du footer en feuille du thème |
| 9 | `!image(…$$clé$$…)` : faux avertissement « image not found » (chemin vérifié avant traduction), l'image s'affiche bien | ouvert, cosmétique | `<img src="…$$lang$$…">` en HTML |
| 10 | Installation depuis git : pas de version figée (branche ou tag) | ouvert, utile | ne pas mettre à jour avant une conférence |
| 11 | Doc : `++CLÉ++` lue à la racine de `slidesk.toml`, pas dans `[slidesk]` | ouvert, doc | variables au-dessus de `[slidesk]` |

## 10. Vérifications faites (SliDesk 2.23.0)

- Fichiers de langue du thème lus ; le deck l'emporte sur une clé du thème ; clé absente du deck → valeur du thème.
- `$$clé$$` traduit dans les slides et dans les notes, en FR et en EN.
- Markdown en ligne d'une valeur rendu (code, gras, lien).
- `$$lang$$` dans un chemin d'image : bonne image par langue ; avertissement « image not found » avec `!image`.
- Footer installé sous `themes/slidesk-theme-wildagsx/` : logos OVHcloud (foncé, blanc sur `dark`), badge sans logo de conf, logo du deck, masquage sur une couverture `[[logo]]`.
- Thème cloné à la main depuis un dépôt local : `slidesk theme update` récupère le nouveau commit ; le clone ne suit que la branche clonée.
- Un `main.md` qui commence par `!include(...)` sans ligne vide avant n'inclut rien (2.22.3).

## 11. Vérifier un deck

```bash
cd deck
slidesk save -l fr -t "$SCRATCH/out-fr" "$PWD"
slidesk save -l en -t "$SCRATCH/out-en" "$PWD"
```
Capturer chaque slide en Chromium headless 1920×1080 en `file://…/index.html#N`, comparer au PDF d'origine, dans les deux langues. Avant tout commit : `git diff -- 'deck/plugins/@gouz__*' 'deck/templates/@gouz__*'` doit être vide.
