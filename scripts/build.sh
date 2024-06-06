#!/bin/bash
DEV_DIR=./deploy/dev
PROD_DIR=./deploy/prod

mkdir -p "$DEV_DIR/priv/static"
mkdir -p "$PROD_DIR/priv/static"

echo "Building project..."
gleam run -m lustre/dev build app

if [ $? -eq 0 ]; then
	echo "Build successful. Copying files..."

	cp -r ./priv "$DEV_DIR/"
	cp index.html "$DEV_DIR/"
	echo "Done."

	echo "Building for production..."
	cp index.html "$PROD_DIR/"

	echo "Performing minification..."
	find "$DEV_DIR/priv" -name '*.mjs' | while read -r file; do
		outfile=$(echo "$file" | sed 's|deploy/dev/priv|deploy/prod/priv|' | sed 's/\.mjs/\.min\.mjs/')
		mkdir -p $(dirname "$outfile")
		terser "$file" --compress --mangle --output "$outfile"
	done

	find "$DEV_DIR/priv" -name '*.css' | while read -r file; do
		outfile=$(echo "$file" | sed 's|deploy/dev/priv|deploy/prod/priv|' | sed 's/\.css/\.min\.css/')
		mkdir -p $(dirname "$outfile")
		csso "$file" --output "$outfile"
	done

fi
