# Talk « Les dev containers, la boîte à outils ultime pour les devs ? » — 30 min, FR et EN

Conventions générales des decks : skill `slidesk-talk`, et le README du thème `slidesk-theme-wildagsx`. Ici, uniquement ce qui est propre à ce talk.

## Sources
- Deck d'origine : `~/Downloads/2026-09-JUG SummerCamp - DevContainers 30 mins.pdf` (17 pages, JUG SummerCamp 2026). Le port reprend son contenu et son ordre ; pas de notes speaker dans le PDF.
- Démos : repo `../dev-containers-talk` (branches `step-00` … `step-12`, son README est le script des démos). Repos liés : `../dev-containers-template-talk`, `../feature-dev-containers-talk`.
- `ARCHITECTURE.md` : choix d'architecture (deck + thème partagé), plan des étapes et des branches.
- `SLIDESK-FEEDBACK.md` : limites de SliDesk constatées, rédigées pour son créateur ; tenir à jour.

## Décisions prises (ne pas rouvrir sans demande)
- Un seul deck pour le FR et l'EN : tout le texte (titres, puces, notes) passe par `$$clé$$` dans `deck/fr.lang.json` (défaut) et `deck/en.lang.json`.
- Thème partagé installé par `slidesk theme install` dans `deck/themes/slidesk-theme-wildagsx/`, non versionné ici (`.gitignore`). En attendant que le dépôt du thème soit sur GitHub : clone local (README).
- Slides numérotées à partir de `00` : `00-cover`, `01-merci` (slide récurrente du thème), puis le contenu du PDF.
- Conférence visée : DevDays. Pas encore de visuels : `deck/assets/images/conf-logo.svg` est une copie du badge « à remplacer » du thème, affichée en grand sur la couverture (bloc `[[logo]]`) et dans le footer. Pas de bloc `[[bg]]`.
- Couverture : le titre et le logo de la conférence seulement ; pas de ligne « Speaker : … » (elle était propre au JUG SummerCamp).
- Titre de l'onglet : `TITLE` fixe dans `slidesk.toml` (SliDesk ne le traduit pas).

## À faire avant DevDays
- Logo DevDays : remplacer `deck/assets/images/conf-logo.svg` (garder ce nom ; un PNG s'embarque en data URI, voir README du thème) ; visuel éventuel de couverture → bloc `[[bg]]` de `00-cover.md`.
- URLs de la slide de fin dans `deck/slidesk.toml` : `SLIDES_URL`, `FEEDBACK_URL`, `SOURCE_URL` (aujourd'hui `https://example.com/a-remplacer/…`).
- Pousser le dépôt du thème sur GitHub (privé), puis remplacer le clone local par `slidesk theme install <url-git>` (README).
- Notes speaker : aucune pour l'instant (pas de script dans le PDF) ; Stéphane les écrit lui-même, en `$$clé$$` (une clé par paragraphe) dans les deux fichiers de langue.

## État
- Port terminé (11/2026) : 17 slides `00` à `16`, FR et EN, vérifiées en capture 1920×1080. Images d'origine fournies par Stéphane (poste de dév, schéma VS Code, démos).
- Ajouts au thème faits pendant le port : `no-title`, classe `credit`, `title-big`, `wide`, `compact`, `schema` en grille, slide de fin en grille (détail : `ARCHITECTURE.md` §8).
