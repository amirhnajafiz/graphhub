import os

def list_directories(path: str) -> list:
    return [entry for entry in os.listdir(path) if os.path.isdir(os.path.join(path, entry))]

def link_generator(path: str, prefix: str) -> list:
    files = [entry for entry in os.listdir(path) if os.path.isfile(os.path.join(path, entry))]
    
    # only include markdown files (.md) and exclude index.md
    files = [entry for entry in files if entry.endswith('.md') and entry != "index.md"]
    files = [os.path.join(prefix, entry) for entry in files]
    
    return sorted(files)

def get_markdown_title(md_path: str) -> str:
    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('#'):
                    return line.lstrip('#').strip()
    except Exception:
        pass
    return os.path.splitext(os.path.basename(md_path))[0]

def main():    
    path = "docs"
    output_file = os.path.join(path, "_sidebar.md")
    
    # find all directories
    directories = list_directories(path)

    lines = ["- [Home](home.md)"]

    # add directories and their markdown files as children
    for directory in sorted(directories):
        dir_path = os.path.join(path, directory)
        md_files = link_generator(dir_path, directory)
        
        # use directory name as the parent title
        lines.append(f"- [{directory.replace('_', ' ').capitalize()}]({directory}/index.md)")
        for md_file in md_files:
            md_path = os.path.join(path, md_file)
            title = get_markdown_title(md_path)
            lines.append(f"  - [{title}]({md_file})")

    # write to sidebar.md
    with open(output_file, "w", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")

if __name__ == "__main__":
    main()
