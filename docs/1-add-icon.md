# How to Add a New Icon

Icons must be provided as TSX components. You can either manually convert your SVG files or use the built-in functionality described below.

## 1. Automatically convert any SVG files

You can automatically convert your icons using the integrated SVGR workflow. Simply place your SVG file into the `svgicon` folder at the root of the project, then run:

`npm run svg`

Please refer to the `package.json` for more details, and feel free to customize the process if needed.

## 2. Add the Icon to `utils/IconFactory.tsx`

To enable dynamic rendering of your new icon, add it to the IconFactory in `utils/IconFactory.tsx`. The icon will be referenced in the app by its assigned ID.
