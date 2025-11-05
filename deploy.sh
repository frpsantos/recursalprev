#!/bin/bash

echo "🚀 Iniciando deploy RecursalPrev..."

# Verifica se há alterações
if [[ -z $(git status --porcelain) ]]; then
  echo "⚠️ Nenhuma alteração para commit."
  exit 0
fi

# Solicita comentário do usuário
read -p "📝 Digite o comentário do commit: " comentario

# Se o comentário estiver vazio, define um padrão
if [ -z "$comentario" ]; then
  comentario="Atualização automática"
fi

# Executa o commit e o push
git add .
git commit -m "$comentario"
git push

echo "✅ Deploy enviado para o GitHub com o comentário: \"$comentario\""
echo "⚙️  A Vercel iniciará o build automaticamente..."

