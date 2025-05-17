import os

def list_directories(path: str) -> list:
    """returns a list of directories in the given path

    Args:
        path (str): path to the directory

    Returns:
        list: list of directories
    """
    return [entry for entry in os.listdir(path) if os.path.isdir(os.path.join(path, entry))]

def link_generator(path: str, prefix: str) -> list:
    """returns a list of links to the files in the given path

    Args:
        path (str): path to the directory
        prefix (str): prefix to add to the links

    Returns:
        list: list of links
    """
    files = [entry for entry in os.listdir(path) if os.path.isfile(os.path.join(path, entry))]
    # Only include markdown files
    files = [entry for entry in files if entry.endswith('.md')]
    files = [os.path.join(prefix, entry) for entry in files]
    return sorted(files)

def get_markdown_title(md_path):
    """Extracts the first heading from a markdown file as its title."""
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
    output_file = os.path.join(path, "sidebar.md")
    # Find all root-level markdown files
    root_md_files = [f for f in os.listdir(path) if f.endswith('.md') and os.path.isfile(os.path.join(path, f))]
    # Find all directories
    directories = list_directories(path)

    lines = []

    # Add root markdown files as top-level items
    for md_file in sorted(root_md_files):
        title = get_markdown_title(os.path.join(path, md_file))
        lines.append(f"- [{title}]({md_file})")

    # Add directories and their markdown files as children
    for directory in sorted(directories):
        dir_path = os.path.join(path, directory)
        md_files = link_generator(dir_path, directory)
        if not md_files:
            continue
        # Use directory name as the parent title
        lines.append(f"- [{directory.capitalize()}]()")
        for md_file in md_files:
            md_path = os.path.join(path, md_file)
            title = get_markdown_title(md_path)
            lines.append(f"  - [{title}]({md_file})")

    # Write to sidebar.md
    with open(output_file, "w", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")

if __name__ == "__main__":
    main()
