#!/bin/bash

echo "Building project..."
gleam run -m lustre/dev build app

if [ $? -eq 0 ]; then
	echo "Build successful. Copying files..."

	cp -r priv ./deploy/dev/priv
	cp index.html ./deploy/dev/
	echo "Done."

	echo "Building for production..."
	cp index.html ./deploy/prod/

	echo "Performing minification..."
	find ./deploy/dev/priv -name '*.mjs' | while read -r file; do
		outfile=$(echo "$file" | sed 's/dev/prod/' | sed 's/\.mjs/\.min\.mjs/')
		mkdir -p $(dirname "$outfile")
		terser "$file" --compress --mangle --output "$outfile"
	done

	find ./deploy/dev/priv -name '*.css' | while read -r file; do
		outfile=$(echo "$file" | sed 's/dev/prod/' | sed 's/\.css/\.min\.css/')
		mkdir -p $(dirname "$outfile")
		csso "$file" --output "$outfile"
	done

fi
