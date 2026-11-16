# Talk « Les dev containers, la boîte à outils ultime pour les devs ? » — 30 min, FR et EN

Conventions générales des decks : skill `slidesk-talk`, et le README du thème `slidesk-theme-wildagsx`. Ici, uniquement ce qui est propre à ce talk.

## Sources
- Deck d'origine : `~/Downloads/2026-09-JUG SummerCamp - DevContainers 30 mins.pdf` (17 pages, JUG SummerCamp 2026). Le port reprend son contenu et son ordre ; pas de notes speaker dans le PDF.
- Démos : repo `../dev-containers-talk` (branches `step-00` … `step-12`, son README est le script des démos). Repos liés : `../dev-containers-template-talk`, `../feature-dev-containers-talk`.
- `ARCHITECTURE.md` : choix d'architecture (deck + thème partagé), plan des étapes et des branches.
- `SLIDESK-FEEDBACK.md` : limites de SliDesk constatées, rédigées pour son créateur ; tenir à jour.

## Décisions prises (ne pas rouvrir sans demande)
- Un seul deck pour le FR et l'EN : tout le texte (titres, puces, notes) passe par `$$clé$$` dans `deck/fr.lang.json` (défaut) et `deck/en.lang.json`.
- Thème partagé installé par `slidesk theme install` dans `deck/themes/slidesk-theme-wildagsx/`, non versionné ici (`.gitignore`), depuis le dépôt privé https://github.com/philippart-s/slidesk-theme-wildagsx.git.
- Slides numérotées à partir de `00` : `00-cover`, `01-merci` (slide récurrente du thème), puis le contenu du PDF.
- Conférence visée : meetup AFUP Tours du 7 décembre 2026, look habituel du gabarit. `deck/assets/images/conf-logo.svg` = logo AFUP Tours (`deck/assets/images/afup-tours-logo.png` fourni par Stéphane, PNG en data URI), affiché sur la couverture (bloc `[[logo]]`) et dans le footer. Pas de bloc `[[bg]]`.
- Couverture : le titre et le logo de la conférence seulement ; pas de ligne « Speaker : … » (elle était propre au JUG SummerCamp).
- Titre de l'onglet : `TITLE="$$tab_title$$"` dans `slidesk.toml`, clé `tab_title` dans les deux fichiers de langue (traduit depuis SliDesk 2.24).
- DevDay 2026 impose son template PowerPoint (`~/Downloads/DevDay2026 - Développeurs - … (FR).pptx`, polices Namian et Sora du kit) : portage ponctuel en français dans `devday-2026/DevDay2026-dev-containers-FR.pptx` et son PDF (export ONLYOFFICE). Pas une règle pour les autres talks. Différences avec le deck SliDesk : sans émojis (puces du template), couverture texte avec accroche, bio de la disposition « Speaker », slides d'exemple du template retirées, « Évaluez cette session » (QR OpenFeedback de DevDay) en dernière slide. Le deck SliDesk reste la source : une modification de contenu se reporte à la main dans le `.pptx`.
- Édition DevDay 2026 (novembre 2026) : look DevDay en thème local (`deck/themes/devday-2026/`), badge, sous-titre et pavé speaker sur la couverture, slide des partenaires. Retirée de `main` après la conférence ; l'état exact est conservé par le tag git `devday-2026` (à reprendre de là si besoin, sans le refusionner).
- Distribution : une copie figée par édition, FR et EN, dans talks-slides (`dev-containers/<édition>/`), publiée par le workflow `publish-talk.yml` de talks-slides lancé à la main (secret `TALKS_PUBLISH_TOKEN` dans talks-slides seulement). `slidesk deploy -t github` écarté : il publie dans les Pages du repo du talk (pas de copie par édition ni d'index commun).

## À faire avant AFUP Tours (7 décembre 2026)
- URLs de la slide de fin (`deck/slidesk.toml`) : liens courts `ovh.to` créés par Stéphane ; `SLIDES_URL` (`ovh.to/afup-tours-2026-slides`) doit rediriger vers l'édition `afup-tours-2026` de talks-slides (à publier).
- Publier l'édition AFUP Tours (README, « Publier une édition ») une fois le deck final.
- Notes speaker : aucune pour l'instant (pas de script dans le PDF) ; Stéphane les écrit lui-même, en `$$clé$$` (une clé par paragraphe) dans les deux fichiers de langue.

## État
- Port terminé (11/2026) : 17 slides `00` à `16`, FR et EN, vérifiées en capture 1920×1080. Images d'origine fournies par Stéphane (poste de dév, schéma VS Code, démos).
- Ajouts au thème faits pendant le port : `no-title`, classe `credit`, `title-big`, `wide`, `compact`, `schema` en grille, slide de fin en grille (détail : `ARCHITECTURE.md` §8).
