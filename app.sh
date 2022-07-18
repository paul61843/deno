port=${1:-8080}

deno run --allow-net --allow-write --allow-read --allow-env --watch main.tsx --port=$port