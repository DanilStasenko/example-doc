# Example for docusaurus i18n

Есть две локали: en и it

Чтобы локально развернуть сайт для определенной локали нужно использовать команду ```yarn run start -- --locale it``` для итальянского языка, ```yarn run start -- --locale en``` - для английского. 

## Добавление переводов для страниц mdx
Необходимо создать папку  ```mkdir -p i18n/en/docusaurus-plugin-content-docs/current``` и копировать туда файлы ```cp -r docs/** i18n/en/docusaurus-plugin-content-docs/current```. В этих файлах вручную менять текст. 