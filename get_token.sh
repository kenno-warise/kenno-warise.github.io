#! /bin/bash
# gitのアクセストークンをクリップボードに保存
# 2025/2/13

cat ~/pylist/$1 | grep '^g' | xsel -b
echo `xsel -b`
