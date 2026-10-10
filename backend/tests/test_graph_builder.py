from app.services.parser.models import CodeEntity, CodeCall, ParseResult
from app.services.graph.builder import GraphBuilder


def test_same_name_functions_in_different_files():
    file_a = ParseResult(
        file_path="repo/a.py",
        language="python",
        entities=[
            CodeEntity("helper", "function", "repo/a.py", 1),
            CodeEntity("main", "function", "repo/a.py", 4),
        ],
        calls=[
            CodeCall("main", "helper", "repo/a.py", 5),
        ],
    )

    file_b = ParseResult(
        file_path="repo/b.py",
        language="python",
        entities=[
            CodeEntity("helper", "function", "repo/b.py", 1),
        ],
    )

    graph = GraphBuilder().build([file_a, file_b])

    nodes = {node.id: node for node in graph.nodes}

    call_edges = [
        edge for edge in graph.edges
        if edge.relation == "calls"
    ]

    targets = {edge.target for edge in call_edges}

    assert targets == {"function:repo/a.py:helper"}
    assert all(nodes[edge.source].name == "main" for edge in call_edges)


def test_ambiguous_same_file_callee_is_skipped():
    result = ParseResult(
        file_path="repo/app.py",
        language="python",
        entities=[
            CodeEntity("helper", "function", "repo/app.py", 1),
            CodeEntity("helper", "function", "repo/app.py", 4),
            CodeEntity("main", "function", "repo/app.py", 7),
        ],
        calls=[
            CodeCall("main", "helper", "repo/app.py", 8),
        ],
    )

    graph = GraphBuilder().build([result])

    call_edges = [
        edge for edge in graph.edges
        if edge.relation == "calls"
    ]

    assert call_edges == []
