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
ng generate component pages/home --inline-style --inline-template --project web --standalone
ng generate component pages/dogs-create --inline-style --inline-template --project web --standalone
ng generate component pages/dogs-dog --inline-style --inline-template --project web --standalone
ng generate component pages/dogs-dog-posts-create --inline-style --inline-template --project web --standalone
ng generate component pages/dogs-dog-posts-post --inline-style --inline-template --project web --standalone
ng generate component pages/dogs-dog-posts --inline-style --inline-template --project web --standalone
ng generate component pages/scan --inline-style --inline-template --project web --standalone

# projects/web/src/app/app.routes.tsにrouting設定を追記
# projects/web/src/app/app.config.tsのprovideRouterにwithComponentInputBinding()

# Testing Library導入
npm install --save-dev @testing-library/angular
# testing-libraryの流儀でテスト書き換え

# 認証関連ページを追加
ng generate component pages/auth-sign-up --inline-style --inline-template --project web --standalone
ng generate component pages/auth-sign-in --inline-style --inline-template --project web --standalone
ng generate component pages/auth-reset-password --inline-style --inline-template --project web --standalone

# Navbar
ng generate component ui/navbar --inline-style --inline-template --project web --standalone
ng generate component ui/drawer --inline-style --inline-template --project web --standalone
ng generate component ui/avatar --inline-style --inline-template --project web --standalone
ng generate component ui/avatar-with-tooltip --inline-style --inline-template --project web --standalone
ng generate component ui/menu --inline-style --inline-template --project web --standalone
ng generate component ui/dropdown-menu --inline-style --inline-template --project web --standalone
ng generate component ui/footer --inline-style --inline-template --project web --standalone

# fontawesome icon (Angular 16.x -> @fortawesome/angular-fontawesome@0.13)
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/angular-fontawesome@0.13

# icon関連コンポーネントを作成(単純なコンポーネントなのでテストは省略し、アイコンの数だけコピペして対応した)
ng generate component ui/icons/fontawesome/fa-home-icon --inline-style --inline-template --project web --standalone

# @angular/fire セットアップ https://zenn.dev/akai/articles/a66df86caab520
# app.module.tsをダミーで作る(2023/07/26時点だと、standalone環境で、app.module.tsが無いと次のコマンドがエラーになる)
ng add @angular/fire
# app.module.tsへのfirebase関連実装を app.config.ts に移す

# auth関連
ng generate

ng generate component ui/button/sign-in-button --inline-style --inline-template --project web --standalone
