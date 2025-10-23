#!/bin/bash

echo "🚀 Iniciando deploy RecursalPrev..."

git add .
git commit -m "Atualização automática"
git push

echo "✅ Deploy enviado para o GitHub. A Vercel fará o build automaticamente!"

