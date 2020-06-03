#!/usr/bin/env python3
import json, os

path_to_json = './tools/'
json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]

for json_file in json_files:
    with open(path_to_json + json_file, 'r', encoding='utf-8' ) as f:
        data = json.load(f)
        updated_tags = []
        for tag in data['tags']:
            updated_tags.append(tag.lower().replace(' ', '-'))

        data['tags'] = updated_tags

    with open(path_to_json + json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
