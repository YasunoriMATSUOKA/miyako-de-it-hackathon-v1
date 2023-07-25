npm i -g @angular/cli
ng new miyako-de-it-hackathon-v1 --commit false --create-application false --inline-style --inline-template --package-manager npm --routing --skip-git --standalone --strict --style css
cd miyako-de-it-hackathon-v1
ng generate application web --inline-style --inline-template --routing --standalone --strict --style css

# ESLint
ng lint
# 実行すると、諸々インストールするか聞かれるのでYesを選択。以下実行履歴。
# Cannot find "lint" target for the specified project.
# You can add a package that implements these capabilities.

# For example:
#   ESLint: ng add @angular-eslint/schematics

# Would you like to add ESLint now? Yes
# ℹ Using package manager: npm
# ✔ Found compatible package version: @angular-eslint/schematics@16.1.0.
# ✔ Package information loaded.

# The package @angular-eslint/schematics@16.1.0 will be installed and executed.
# Would you like to proceed? Yes
# ✔ Packages successfully installed.

#     All @angular-eslint dependencies have been successfully installed 🎉

#     Please see https://github.com/angular-eslint/angular-eslint for how to add ESLint configuration to your project.

#     We detected that you have a single project in your workspace and no existing linter wired up, so we are configuring ESLint for you automatically.

#     Please see https://github.com/angular-eslint/angular-eslint for more information.

# CREATE .eslintrc.json (991 bytes)
# CREATE projects/web/.eslintrc.json (645 bytes)
# UPDATE package.json (1433 bytes)
# UPDATE angular.json (3513 bytes)
# ✔ Packages installed successfully.

# Prettier
npm i -D prettier eslint-config-prettier @typescript-eslint/eslint-plugin
# .eslintrc.jsonに"prettier"を追記
# .prettierrc.jsonを作成＆設定
# package.jsonに `"lint-fix": "prettier --write \"projects/**/*.ts\""` を追記

# 保存時のPrettier自動実行等のVSCode設定
# .vscode/extensions.jsonに `"dbaeumer.vscode-eslint", "esbenp.prettier-vscode"` を追記
# .vscode/settings.jsonを作成＆以下設定
# {
#   "editor.formatOnSave": true,
#   "editor.defaultFormatter": "esbenp.prettier-vscode"
# }

# TailwindCSS
# https://tailwindcss.com/docs/guides/angular を参考に設定するが、マルチプロジェクトの場合、パスが異なるのに注意。
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
# tailwind.config.jsを編集
# styles.cssに追記

# daisyUI
# https://daisyui.com/docs/install/ を参考に設定
npm i -D daisyui@latest
# tailwind.config.jsのpluginsに`require("daisyui")`を追加

# Firebase
npm i -D firebase-tools
npm i firebase

# firebaseのwebコンソール上でプロジェクト作成、firestoreのリージョン選択、storageのバケット作成
ng generate environments --project web
# environment.tsとenvironment.development.tsにfirebase関連の各種秘密情報を追記

npx firebase login
npx firebase init

# URLに対応したページを追加
ng generate component home --inline-style --inline-template --project web --standalone
ng generate component dogs-create --inline-style --inline-template --project web --standalone
ng generate component dogs-dog --inline-style --inline-template --project web --standalone
ng generate component dogs-dog-posts-create --inline-style --inline-template --project web --standalone
ng generate component dogs-dog-posts-post --inline-style --inline-template --project web --standalone
ng generate component dogs-dog-posts --inline-style --inline-template --project web --standalone
ng generate component scan --inline-style --inline-template --project web --standalone

# projects/web/src/app/app.routes.tsにrouting設定を追記
# projects/web/src/app/app.config.tsのprovideRouterにwithComponentInputBinding()

# Testing Library導入
npm install --save-dev @testing-library/angular
# testing-libraryの流儀でテスト書き換え

# 認証関連ページを追加
ng generate component auth-sign-up --inline-style --inline-template --project web --standalone
ng generate component auth-sign-in --inline-style --inline-template --project web --standalone
ng generate component auth-reset-password --inline-style --inline-template --project web --standalone
