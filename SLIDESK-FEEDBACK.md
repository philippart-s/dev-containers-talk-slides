# Retours SliDesk — multilingue et thème partagé

Constats faits avec SliDesk **2.22.3** en préparant un talk donné en français et en anglais (une seule source, `fr.lang.json` / `en.lang.json`, `--lang`), et un thème commun réutilisé par tous mes talks.

Chaque point décrit le besoin, ce qui se passe, comment le reproduire et ce qui serait attendu. Les points sont classés par importance pour ce talk.

## Nécessaires pour ce talk

### 1. Les notes speaker ne sont pas traduites

**Besoin.** Les notes `/* … */` contiennent le script du talk. Quand je présente en anglais, la vue speaker doit afficher le script anglais.

**Constat.** Un `$$clé$$` est remplacé dans le texte des slides, mais pas dans les notes : la vue speaker affiche `$$clé$$` tel quel, quelle que soit la langue choisie. Les notes semblent mises de côté (encodées) avant le passage de traduction, qui ne les voit donc pas.

**Reproduire.**
```
main.md            (ligne vide) puis !include(slides)
slides/00-a.md     ## $$title$$
                   /*
                   $$notes$$
                   */
fr.lang.json       {"default": true, "translations": {"title": "Bonjour", "notes": "Script FR"}}
en.lang.json       {"translations": {"title": "Hello", "notes": "EN script"}}
```
`slidesk -n -l en` : la slide affiche « Hello », la vue speaker affiche `$$notes$$`.

**Attendu.** Les `$$clé$$` des notes traduits comme ceux des slides, en gardant le rendu markdown de la note (paragraphes, gras, listes) et le checkpoint `//@ < mm:ss`.

### 2. Le markdown contenu dans une traduction n'est pas interprété

**Besoin.** Une phrase se traduit en entier, pas morceau par morceau : l'ordre des mots change d'une langue à l'autre. Quand la phrase contient du gras, de l'italique, du code inline (`devcontainer.json`) ou un lien, ce formatage doit faire partie de la valeur traduite.

**Constat.** Le formatage *autour* d'une clé fonctionne (`**$$k$$**`, `*$$k$$*`, `` `$$k$$` ``, `[$$k$$](url)`). Le formatage *dans* la valeur ne l'est pas : `"k": "avec **gras**"` s'affiche `avec **gras**`. La traduction intervient après la conversion du markdown en HTML.

**Reproduire.** `"k": "Le fichier `devcontainer.json` décrit l'environnement"`, slide `- $$k$$` → les accents graves restent visibles.

**Attendu.** La valeur d'une clé interprétée comme du markdown (au moins le markdown en ligne : gras, italique, code, liens), comme si elle avait été écrite dans la slide.

### 3. Un thème ne peut pas fournir ses propres traductions

**Besoin.** Mon thème contient des slides récurrentes incluses par tous mes talks (remerciements, présentation du speaker, slide de fin avec QR codes). Leurs textes existent en français et en anglais.

**Constat.** Les traductions ne sont lues que dans les `*.lang.json` à la racine du talk. Un thème ne peut pas apporter les siennes : les textes des slides récurrentes doivent être recopiés dans les fichiers de langue de chaque talk, et corrigés partout à chaque modification.

**Attendu.** Un thème (ou un `COMMON_DIR`) qui peut fournir des fichiers de langue, fusionnés avec ceux du talk, le talk ayant la priorité en cas de clé identique.

## Utile

### 4. La langue choisie n'est pas connue des composants et des plugins

**Besoin.** Un composant ou un plugin qui adapte son rendu à la langue : libellés générés, formats de date, attribut `lang` de la page (accessibilité, césure).

**Constat.** `--lang` n'est transmis ni aux composants (`.mjs`), ni aux plugins (`window.slidesk.env` ne le contient pas), ni à la page (`<html lang>`).

**Attendu.** La langue courante disponible pour les composants (argument ou variable), dans `window.slidesk`, et posée dans `<html lang="…">`.

Si les points 1 à 3 sont traités nativement, ce point devient secondaire.

## Gênant, facile à contourner

### 8. La CSS d'un plugin de thème est référencée par un chemin absolu

**Besoin.** Un thème qui embarque un plugin (ici, un footer présent sur toutes les slides) avec sa feuille de style, et un deck exporté par `slidesk save` qui fonctionne partout : ouvert en `file://`, ou publié dans un sous-dossier (GitHub Pages d'un projet : `https://<user>.github.io/<repo>/`).

**Constat.** Pour un plugin placé dans `themes/<thème>/plugins/<plugin>/`, les fichiers de `addStyles` sont écrits `href=/themes/<thème>/plugins/<plugin>/…`, avec un `/` en tête. Toutes les autres feuilles (thème, templates, plugins du deck) sont en chemin relatif (`themes/…`, `plugins/…`). Avec `slidesk present`, servi à la racine, ça marche. En `file://` ou sous un sous-dossier, la feuille du plugin n'est pas chargée, sans erreur visible.

**Reproduire.** `themes/t/plugins/p/plugin.json` = `{"addStyles": ["plugins/p/p.css"]}`, `slidesk save -t out`, puis regarder `out/index.html` : `href=/themes/t/plugins/p/p.css`.

**Attendu.** Un chemin relatif, comme pour les autres feuilles. Les scripts (`addScripts`) suivent probablement le même chemin : non vérifié.

### 5. `!include(...)` en première ligne d'un fichier est ignoré

**Constat.** La directive n'est reconnue qu'après un saut de ligne. Un `main.md` qui contient seulement `!include(slides)` affiche une slide dont le titre est `!include(slides)`, sans message d'erreur.

**Attendu.** Directive reconnue aussi en première ligne, ou un avertissement.

## Non nécessaires ici (pour information)

### 6. `COMMON_DIR` ne partage pas les templates

`COMMON_DIR` partage les plugins et les fichiers, mais pas les templates `.sdt`. Un gabarit commun avec un template doit donc passer par un thème copié dans chaque talk.

### 7. Pas d'addon privé sur slidesk.link

Un addon poussé sur le hub est téléchargeable par tous. Un thème personnel non public ne peut pas profiter de `theme install` / `slidesk update`.
