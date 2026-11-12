# Les dev containers, la boîte à outils ultime pour les devs ?

Slides du talk de Stéphane Philippart (@wildagsx), en français et en anglais, avec [SliDesk](https://github.com/slidesk/slidesk) ≥ 2.23.0.

## Installer

Le thème partagé n'est pas versionné dans ce dépôt : l'installer après un `git clone`.

```bash
cd deck
slidesk theme install <url-git>/slidesk-theme-wildagsx.git
# tant que le dépôt du thème n'est que local :
# git clone file://$HOME/Developments/slidesk-theme-wildagsx themes/slidesk-theme-wildagsx
```

Mettre à jour le thème : `cd deck && slidesk theme update slidesk-theme-wildagsx` (écrase les modifications locales du dossier du thème ; ne pas le faire juste avant une conférence).

Quand le dépôt du thème sera sur GitHub, remplacer le clone local par l'installation depuis l'URL : `cd deck && slidesk theme install <url-git>/slidesk-theme-wildagsx.git` (remplace le dossier existant).

Les addons du hub (`plugins/@gouz__*`, `templates/@gouz__split`) sont versionnés ici. Derrière le proxy d'entreprise, préfixer les commandes réseau de SliDesk de `NODE_TLS_REJECT_UNAUTHORIZED=0`.

## Présenter

```bash
cd deck
slidesk -n -o          # français
slidesk -n -o -l en    # anglais
```

`-n` ouvre la vue speaker (notes, minuteur, checkpoints).

## Exporter

```bash
cd deck
slidesk save -l fr -t ../public/fr
slidesk save -l en -t ../public/en
```

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
