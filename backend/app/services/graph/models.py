from dataclasses import dataclass, field
from typing import List


@dataclass
class GraphNode:
    id: str
    node_type: str
    name: str
    file_path: str = ""
    line: int = 0


@dataclass
class GraphEdge:
    source: str
    target: str
    relation: str


@dataclass
class CodeGraph:
    nodes: List[GraphNode] = field(default_factory=list)
    edges: List[GraphEdge] = field(default_factory=list)
