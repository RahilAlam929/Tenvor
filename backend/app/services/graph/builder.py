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
        file_function_ids = {}

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
                    file_function_ids.setdefault(
                        result.file_path,
                        {}
                    ).setdefault(
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

                file_functions = file_function_ids.get(call.file_path, {})
                caller_candidates = file_functions.get(call.caller, [])
                callee_candidates = file_functions.get(callee_name, [])

                if len(caller_candidates) != 1 or len(callee_candidates) != 1:
                    continue

                caller_id = caller_candidates[0]
                callee_id = callee_candidates[0]

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
