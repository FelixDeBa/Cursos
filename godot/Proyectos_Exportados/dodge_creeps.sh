#!/bin/sh
echo -ne '\033c\033]0;Dodge Creeps\a'
base_path="$(dirname "$(realpath "$0")")"
"$base_path/game_dodge_creeps.arm64" "$@"
