from pathlib import Path

from app.services.parser.service import PythonParser
from app.services.parser.models import ParseResult


class RepositoryParser:
    def __init__(self):
        self.python_parser = PythonParser()

    def parse(self, repository_path: str) -> list[ParseResult]:
        root = Path(repository_path)

        results = []

        for file in root.rglob("*.py"):
            if any(
                part in {
                    ".git",
                    ".venv",
                    "node_modules",
                    "__pycache__",
                }
                for part in file.parts
            ):
                continue

            try:
                result = self.python_parser.parse(str(file))
                results.append(result)
            except Exception:
                continue

        return results
