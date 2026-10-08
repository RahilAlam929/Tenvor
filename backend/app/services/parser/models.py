from dataclasses import dataclass, field
from typing import Optional, List


@dataclass
class CodeEntity:
    name: str
    entity_type: str
    file_path: str
    line: int
    parent: Optional[str] = None


@dataclass
class ParseResult:
    file_path: str
    language: str
    entities: List[CodeEntity] = field(default_factory=list)
    imports: List[str] = field(default_factory=list)
