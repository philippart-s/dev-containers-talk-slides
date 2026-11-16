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
- Conférence visée : DevDay 2026 (devday.be). `deck/assets/images/conf-logo.svg` = logotype « devday » extrait du template PowerPoint de la conférence (`ppt/media/image4.png`, blanc d'origine recoloré en `#141517` pour le fond blanc, PNG en data URI), affiché en grand sur la couverture (bloc `[[logo]]`) et dans le footer. Pas de bloc `[[bg]]`.
- Couverture : le titre et le logo de la conférence seulement ; pas de ligne « Speaker : … » (elle était propre au JUG SummerCamp).
- Titre de l'onglet : `TITLE` fixe dans `slidesk.toml` (SliDesk ne le traduit pas).
- DevDay 2026 impose son template PowerPoint (`~/Downloads/DevDay2026 - Développeurs - … (FR).pptx`, polices Namian et Sora du kit) : portage ponctuel en français dans `devday-2026/DevDay2026-dev-containers-FR.pptx` et son PDF (export ONLYOFFICE). Pas une règle pour les autres talks. Différences avec le deck SliDesk : sans émojis (puces du template), couverture texte avec accroche, bio de la disposition « Speaker », slides d'exemple du template retirées, « Évaluez cette session » (QR OpenFeedback de DevDay) en dernière slide. Le deck SliDesk reste la source : une modification de contenu se reporte à la main dans le `.pptx`.
- Look DevDay 2026 (édition DevDay 2026 seulement) : thème local `deck/themes/devday-2026/` (couleurs, polices Namian et Sora du kit, halos et logos tirés du template PowerPoint), chargé par-dessus le gabarit sans le modifier. Va avec : `conf-logo.svg` en blanc, badge `devday-badge` (`$$devday_track$$`) sur `00-cover.md`, sous-titre et pavé speaker sur `00-cover.md`, monogramme « dj » dans le footer, slide `16-partenaires.md` (clés `partners_*`) avant `17-merci.md`. Retour au look habituel après DevDay : supprimer `deck/themes/devday-2026/` et `16-partenaires.md` (renommer `17-merci.md` en `16-merci.md`), retirer badge, sous-titre et pavé speaker de `00-cover.md` et les clés `devday_track` / `partners_*`, remettre un `conf-logo.svg` pour fond clair.
- Distribution : une copie figée par édition, FR et EN, dans talks-slides (`dev-containers/<édition>/`), publiée par le workflow `publish-talk.yml` de talks-slides lancé à la main (secret `TALKS_PUBLISH_TOKEN` dans talks-slides seulement). `slidesk deploy -t github` et l'action officielle écartés : un seul export sans `--lang`, pas d'installation de thème.

## À faire avant DevDay 2026
- URLs de la slide de fin (`deck/slidesk.toml`) : liens courts `ovh.to` créés par Stéphane ; `SLIDES_URL` redirige vers l'édition `devday-2026` de talks-slides (à publier).
- Publier l'édition DevDay 2026 (README, « Publier une édition ») une fois le deck final.
- Notes speaker : aucune pour l'instant (pas de script dans le PDF) ; Stéphane les écrit lui-même, en `$$clé$$` (une clé par paragraphe) dans les deux fichiers de langue.

## État
- Port terminé (11/2026) : 17 slides `00` à `16`, FR et EN, vérifiées en capture 1920×1080. Images d'origine fournies par Stéphane (poste de dév, schéma VS Code, démos).
- Ajouts au thème faits pendant le port : `no-title`, classe `credit`, `title-big`, `wide`, `compact`, `schema` en grille, slide de fin en grille (détail : `ARCHITECTURE.md` §8).
