# Les dev containers, la boîte à outils ultime pour les devs ?

Slides du talk de Stéphane Philippart (@wildagsx), en français et en anglais, avec [SliDesk](https://github.com/slidesk/slidesk) ≥ 2.23.0.

## Installer

Le thème partagé n'est pas versionné dans ce dépôt : l'installer après un `git clone`.

```bash
cd deck
slidesk theme install https://github.com/philippart-s/slidesk-theme-wildagsx.git
```

Mettre à jour le thème : `cd deck && slidesk theme update slidesk-theme-wildagsx` (écrase les modifications locales du dossier du thème ; ne pas le faire juste avant une conférence).

Le dépôt du thème est privé : l'installation utilise tes identifiants git.

Les addons du hub (`plugins/@gouz__*`, `templates/@gouz__split`) sont versionnés ici. Derrière le proxy d'entreprise, préfixer les commandes réseau de SliDesk de `NODE_TLS_REJECT_UNAUTHORIZED=0`.

## Présenter

```bash
cd deck
slidesk -n -o          # français
slidesk -n -o -l en    # anglais
```

`-n` ouvre la vue speaker (notes, minuteur, checkpoints).

## Exporter en local

```bash
cd deck
slidesk save -l fr -t ../public/fr
slidesk save -l en -t ../public/en
```

## Publier une édition

Chaque édition est publiée, figée, dans [talks-slides](https://github.com/philippart-s/talks-slides) (GitHub Pages) : `https://philippart-s.github.io/talks-slides/dev-containers/<édition>/`, une page d'accueil avec les versions `fr/` et `en/`.

1. Avant le talk : `SLIDES_URL` de `deck/slidesk.toml` = l'URL de l'édition (QR code « Slides » de la slide de fin), committé et poussé.
2. Quand le deck est final : dans talks-slides, Actions → « Publier une édition de talk » → Run workflow, avec `repo` = `dev-containers-talk-slides`, `talk` = `dev-containers`, `talk-title` = `Dev containers`, `edition` (ex. `devdays-2027`) et `edition-label` (ex. `DevDays 2027`). `dry-run` construit sans publier (artefact à télécharger) ; `overwrite` remplace une édition déjà publiée ; `slidesk-version` fige une version de SliDesk (dernière release par défaut).
3. Vérifier l'URL de l'édition une fois GitHub Pages reconstruit (une à deux minutes).

Le workflow exporte la branche par défaut de ce dépôt : pousser avant de lancer.

## Contenu

| # | Fichier | Slide |
|---|---|---|
| 00 | `00-cover.md` | couverture |
| 01 | `01-merci.md` | merci (slide du thème) |
| 02 | `02-poste-de-dev.md` | photo du poste de dév |
| 03 | `03-cycle-de-vie.md` | le cycle de vie d'un poste de dév |
| 04 | `04-onboarding.md` | onboarding d'un projet |
| 05 | `05-tester.md` | tester / expérimenter |
| 06 | `06-one-tool.md` | citation « One Tool » |
| 07 | `07-vscode.md` | schéma des dev containers dans VS Code |
| 08 | `08-autres-ide.md` | autres IDE |
| 09 | `09-configuration.md` | configuration de base |
| 10 | `10-demos.md` | démos |
| 11 | `11-solution-ideale.md` | alors, la solution idéale ? |
| 12 | `12-et-moi.md` | et moi ? |
| 13 | `13-speaker.md` | bio (slide du thème) |
| 14 | `14-ovhcloud.md` | carte OVHcloud (slide du thème) |
| 15 | `15-liens.md` | liens |
| 16 | `16-merci.md` | merci, QR codes (slide du thème) |

Le numéro affiché en haut à gauche d'une slide est son rang à partir de 1 (la couverture est la slide 1).

## Organisation

- `deck/slides/NN-slug.md` : une slide par fichier, à partir de `00` ; le texte est dans `deck/fr.lang.json` et `deck/en.lang.json` (`$$clé$$`).
- `deck/slidesk.toml` : titre de l'onglet et variables de l'édition (URLs de la slide de fin).
- `ARCHITECTURE.md` : choix d'architecture ; `SLIDESK-FEEDBACK.md` : limites de SliDesk constatées.
