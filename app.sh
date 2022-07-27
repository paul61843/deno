port=${1:-5000}

denon run --allow-net --allow-write --allow-read --allow-env --watch main.tsx --port=$port
