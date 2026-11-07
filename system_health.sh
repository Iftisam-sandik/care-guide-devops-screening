#!/bin/bash
set -e

# Get CPU usage
cpu=$(vmstat 1 2 | tail -n 1 | awk '{print 100-$15-$16}')

# Get memory usage
memory=$(free | awk '/^Mem:/ {
    printf "%.0f", (1-$7/$2)*100
}')

# Get disk usage
disk=$(df -P / | awk 'NR==2 {
    gsub("%", "", $5)
    print $5
}')

# Add timestamp and save to log file
timestamp=$(TZ=Asia/Dhaka date '+%Y-%m-%d %H:%M:%S %z')

echo "$timestamp | CPU: $cpu% | Memory: $memory% | Disk: $disk%" \
    | tee -a "$(dirname "$0")/health_log.txt"

# Check disk usage threshold
if [ "$disk" -gt 80 ]; then
    echo "[WARNING] Disk space high!"
fi
