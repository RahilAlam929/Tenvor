from pathlib import Path

from tree_sitter import Language, Parser
import tree_sitter_python as tree_sitter_python

from app.services.parser.models import CodeEntity, CodeCall, ParseResult


class PythonParser:
    def __init__(self):
        self.language = Language(tree_sitter_python.language())
        self.parser = Parser(self.language)

    def parse(self, file_path: str) -> ParseResult:
        path = Path(file_path)
        source = path.read_bytes()

        tree = self.parser.parse(source)

        result = ParseResult(
            file_path=str(path),
            language="python",
        )

        self._walk(tree.root_node, source, result)

        return result

    def _walk(self, node, source, result, current_function=None):
        if node.type == "function_definition":
            name_node = node.child_by_field_name("name")

            if name_node:
                name = source[
                    name_node.start_byte:name_node.end_byte
                ].decode("utf-8")

                result.entities.append(
                    CodeEntity(
                        name=name,
                        entity_type="function",
                        file_path=result.file_path,
                        line=node.start_point[0] + 1,
                    )
                )

                current_function = name

        elif node.type == "class_definition":
            name_node = node.child_by_field_name("name")

            if name_node:
                name = source[
                    name_node.start_byte:name_node.end_byte
                ].decode("utf-8")

                result.entities.append(
                    CodeEntity(
                        name=name,
                        entity_type="class",
                        file_path=result.file_path,
                        line=node.start_point[0] + 1,
                    )
                )

        elif node.type == "import_statement":
            result.imports.append(
                source[node.start_byte:node.end_byte].decode("utf-8")
            )

        elif node.type == "import_from_statement":
            result.imports.append(
                source[node.start_byte:node.end_byte].decode("utf-8")
            )

        elif node.type == "call":
            function_node = node.child_by_field_name("function")

            if function_node:
                callee = source[
                    function_node.start_byte:function_node.end_byte
                ].decode("utf-8")

                if current_function:
                    result.calls.append(
                        CodeCall(
                            caller=current_function,
                            callee=callee,
                            file_path=result.file_path,
                            line=node.start_point[0] + 1,
                        )
                    )

        for child in node.children:
            self._walk(
                child,
                source,
                result,
                current_function,
            )
