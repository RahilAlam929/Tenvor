from pathlib import Path
from collections import Counter
import subprocess
import uuid


class RepositoryService:
    def __init__(self):
        self.base_path = Path("data/repositories")
        self.base_path.mkdir(parents=True, exist_ok=True)

    def clone(self, url: str) -> dict:
        repository_id = str(uuid.uuid4())
        repository_path = self.base_path / repository_id

        subprocess.run(
            [
                "git",
                "clone",
                "--depth",
                "1",
                url,
                str(repository_path),
            ],
            check=True,
            capture_output=True,
            text=True,
        )

        return self.scan(repository_id, repository_path)

    def scan(self, repository_id: str, path: Path) -> dict:
        files = []
        languages = Counter()

        ignored = {
            ".git",
            ".venv",
            "node_modules",
            "__pycache__",
            ".next",
            "dist",
            "build",
        }

        extensions = {
            ".py": "Python",
            ".js": "JavaScript",
            ".ts": "TypeScript",
            ".tsx": "TypeScript",
            ".jsx": "JavaScript",
            ".java": "Java",
            ".go": "Go",
            ".cpp": "C++",
            ".c": "C",
        }

        for file in path.rglob("*"):
            if not file.is_file():
                continue

            if any(part in ignored for part in file.parts):
                continue

            relative = file.relative_to(path)
            files.append(str(relative))

            language = extensions.get(file.suffix.lower())

            if language:
                languages[language] += 1

        return {
            "repository_id": repository_id,
            "path": str(path),
            "file_count": len(files),
            "languages": dict(languages),
            "files": files[:1000],
        }
