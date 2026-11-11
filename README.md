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

## Organisation

- `deck/slides/NN-slug.md` : une slide par fichier, à partir de `00` ; le texte est dans `deck/fr.lang.json` et `deck/en.lang.json` (`$$clé$$`).
- `deck/slidesk.toml` : titre de l'onglet et variables de l'édition (URLs de la slide de fin).
- `ARCHITECTURE.md` : choix d'architecture ; `SLIDESK-FEEDBACK.md` : limites de SliDesk constatées.
