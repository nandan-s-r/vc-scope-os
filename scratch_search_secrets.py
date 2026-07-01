import os, re

def search_secrets(directory):
    patterns = [r'AIza[0-9A-Za-z-_]{35}', r'sk-[a-zA-Z0-9]{48}', r'gemini_api_key\s*=\s*[\'"].+[\'"]']
    found = False
    for root, _, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or '.next' in root or '__pycache__' in root or 'venv' in root:
            continue
        for file in files:
            if file.endswith(('.py', '.js', '.ts', '.tsx', '.json', '.html')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        for p in patterns:
                            matches = re.findall(p, content, re.IGNORECASE)
                            if matches:
                                print(f'Found secret in {filepath}: {matches}')
                                found = True
                except:
                    pass
    if not found:
        print('No hardcoded secrets found.')

search_secrets('.')
