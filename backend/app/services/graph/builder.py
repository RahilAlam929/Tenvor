from app.services.parser.models import ParseResult
from app.services.graph.models import (
    CodeGraph,
    GraphEdge,
    GraphNode,
)


class GraphBuilder:
    def build(self, results: list[ParseResult]) -> CodeGraph:
        graph = CodeGraph()

        function_ids = {}

        for result in results:
            file_id = f"file:{result.file_path}"

            graph.nodes.append(
                GraphNode(
                    id=file_id,
                    node_type="file",
                    name=result.file_path.split("/")[-1],
                    file_path=result.file_path,
                )
            )

            for entity in result.entities:
                entity_id = (
                    f"{entity.entity_type}:"
                    f"{result.file_path}:"
                    f"{entity.name}"
                )

                graph.nodes.append(
                    GraphNode(
                        id=entity_id,
                        node_type=entity.entity_type,
                        name=entity.name,
                        file_path=result.file_path,
                        line=entity.line,
                    )
                )

                if entity.entity_type == "function":
                    function_ids.setdefault(
                        entity.name,
                        []
                    ).append(entity_id)

                graph.edges.append(
                    GraphEdge(
                        source=entity_id,
                        target=file_id,
                        relation="defined_in",
                    )
                )

            for import_statement in result.imports:
                import_id = (
                    f"import:"
                    f"{result.file_path}:"
                    f"{import_statement}"
                )

                graph.nodes.append(
                    GraphNode(
                        id=import_id,
                        node_type="import",
                        name=import_statement,
                        file_path=result.file_path,
                    )
                )

                graph.edges.append(
                    GraphEdge(
                        source=file_id,
                        target=import_id,
                        relation="imports",
                    )
                )

        for result in results:
            for call in result.calls:
                callee_name = call.callee.split(".")[-1]

                caller_candidates = function_ids.get(call.caller, [])
                callee_candidates = function_ids.get(callee_name, [])

                if not caller_candidates or not callee_candidates:
                    continue

                caller_id = next(
                    (
                        node_id
                        for node_id in caller_candidates
                        if call.file_path in node_id
                    ),
                    None,
                )

                if not caller_id:
                    continue

                for callee_id in callee_candidates:
                    if caller_id == callee_id:
                        continue

                    graph.edges.append(
                        GraphEdge(
                            source=caller_id,
                            target=callee_id,
                            relation="calls",
                        )
                    )

        return graph
