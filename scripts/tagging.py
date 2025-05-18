import os



def list_directories(path: str) -> list:
    """Returns a list of directories in the given path.

    Args:
        path (str): path to the directory

    Returns:
        list: list of directories
    """
    return [entry for entry in os.listdir(path) if os.path.isdir(os.path.join(path, entry))]

def get_tags(path: str) -> list:
    """Returns a list of tags in the given path.

    Args:
        path (str): path to the directory

    Returns:
        list: list of tags
    """
    tags = []
    tags_file = os.path.join(path, "tags.txt")
    if os.path.isfile(tags_file):
        with open(tags_file, "r") as f:
            tags = [line.strip() for line in f if line.strip()]
    return tags

def main():
    """main function to generate the sidebar.md file."""
    
    path = "docs"
    
    # find all directories
    directories = list_directories(path)
    
    # count tags
    tag_count = {}
    for directory in directories:
        tags = get_tags(os.path.join(path, directory))
        for tag in tags:
            if tag not in tag_count:
                tag_count[tag] = 0
            tag_count[tag] += 1
            
    # sort tags by count
    sorted_tags = sorted(tag_count.items(), key=lambda x: x[1], reverse=True)
    
    # write results to tags.md
    with open("docs/tags.md", "w") as f:
        f.write("# Tags\n\n")
        for tag, count in sorted_tags:
            f.write(f"- **{tag}**: {count}\n")
    
if __name__ == "__main__":
    main()
